// import DeviceToken from "../models/DeviceToken.js";
// import { getMessaging } from "firebase-admin/messaging";
// import admin from "../config/firebaseAdmin.js";

// export async function registerDeviceToken(req, res) {
//   try {
//     const { token, platform = "android" } = req.body;

//     if (!token) {
//       return res.status(400).json({
//         error: "FCM token is required",
//       });
//     }

//     const deviceToken = await DeviceToken.findOneAndUpdate(
//       { token },
//       {
//         userId: req.userId,
//         platform,
//       },
//       {
//         new: true,
//         upsert: true,
//         setDefaultsOnInsert: true,
//       }
//     );

//     return res.status(200).json({
//       message: "Device token registered successfully",
//       deviceToken,
//     });
//   } catch (error) {
//     console.error("Register device token error:", error);

//     return res.status(500).json({
//       error: "Failed to register device token",
//     });
//   }
// }



// export async function sendTestNotification(req, res) {
//   try {
//     const devices = await DeviceToken.find({ userId: req.userId });

//     if (!devices.length) {
//       return res.status(404).json({
//         error: "No registered device found",
//       });
//     }

//     const tokens = devices.map((device) => device.token);

//     const message = {
//       notification: {
//         title: "Radha Naam Jap 🙏",
//         body: "Your Naam Jap journey continues. Radhe Radhe!",
//       },
//       tokens,
//     };

//     const response = await getMessaging(admin).sendEachForMulticast(message);

//     return res.status(200).json({
//       message: "Test notification sent",
//       successCount: response.successCount,
//       failureCount: response.failureCount,
//     });
//   } catch (error) {
//     console.error("Send test notification error:", error);

//     return res.status(500).json({
//       error: "Failed to send test notification",
//     });
//   }
// }


// // Addes this new function on 13/09/26


// export async function sendNotification(req, res) {
//   try {
//     const { target = "all", userId, userIds, title, body } = req.body;

//     if (!title || !body) {
//       return res.status(400).json({ error: "title and body are required" });
//     }

//     let query = {};
//     if (target === "user" && userId) {
//       query = { userId };
//     } else if (target === "users" && Array.isArray(userIds)) {
//       query = { userId: { $in: userIds } };
//     }
//     // target === "all" -> query stays {} (includes guests, since userId can be null)

//     const devices = await DeviceToken.find(query);

//     if (!devices.length) {
//       return res.status(404).json({ error: "No matching devices found" });
//     }

//     const tokens = devices.map((d) => d.token);
//     const message = {
//       notification: { title, body },
//       tokens,
//     };

//     const response = await getMessaging(admin).sendEachForMulticast(message);

//     const invalidTokens = [];
//     response.responses.forEach((r, i) => {
//       if (!r.success && (r.error?.code === "messaging/registration-token-not-registered" || r.error?.code === "messaging/invalid-registration-token")) {
//         invalidTokens.push(tokens[i]);
//       }
//     });

//     let invalidTokensRemoved = 0;
//     if (invalidTokens.length) {
//       const result = await DeviceToken.deleteMany({ token: { $in: invalidTokens } });
//       invalidTokensRemoved = result.deletedCount;
//     }

//     return res.status(200).json({
//       message: "Notification sent",
//       successCount: response.successCount,
//       failureCount: response.failureCount,
//       invalidTokensRemoved,
//     });
//   } catch (error) {
//     console.error("Send notification error:", error);
//     return res.status(500).json({ error: "Failed to send notification" });
//   }
// }





import DeviceToken from "../models/DeviceToken.js";
import { getMessaging } from "firebase-admin/messaging";
import admin from "../config/firebaseAdmin.js";

const FCM_BATCH_SIZE = 500;

// Sends to many tokens in batches of 500 and collects the results
async function sendInBatches(tokens, notification) {
  let successCount = 0;
  let failureCount = 0;
  const invalidTokens = [];

  for (let i = 0; i < tokens.length; i += FCM_BATCH_SIZE) {
    const batch = tokens.slice(i, i + FCM_BATCH_SIZE);
    const response = await getMessaging(admin).sendEachForMulticast({
      notification,
      tokens: batch,
    });

    successCount += response.successCount;
    failureCount += response.failureCount;

    response.responses.forEach((r, index) => {
      const code = r.error?.code;
      if (
        !r.success &&
        (code === "messaging/registration-token-not-registered" ||
          code === "messaging/invalid-registration-token")
      ) {
        invalidTokens.push(batch[index]);
      }
    });
  }

  return { successCount, failureCount, invalidTokens };
}

export async function registerDeviceToken(req, res) {
  try {
    const { token, platform = "android" } = req.body;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        error: "FCM token is required",
      });
    }

    // Only set userId when the user is logged in, so a logged-out
    // app start does not erase a saved userId
    const update = { platform };
    if (req.userId) {
      update.userId = req.userId;
    }

    const deviceToken = await DeviceToken.findOneAndUpdate(
      { token },
      update,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      message: "Device token registered successfully",
      deviceToken,
    });
  } catch (error) {
    console.error("Register device token error:", error);

    return res.status(500).json({
      error: "Failed to register device token",
    });
  }
}

export async function sendTestNotification(req, res) {
  try {
    const devices = await DeviceToken.find({ userId: req.userId });

    if (!devices.length) {
      return res.status(404).json({
        error: "No registered device found",
      });
    }

    const tokens = devices.map((device) => device.token);

    const { successCount, failureCount } = await sendInBatches(tokens, {
      title: "Radha Naam Jap 🙏",
      body: "Your Naam Jap journey continues. Radhe Radhe!",
    });

    return res.status(200).json({
      message: "Test notification sent",
      successCount,
      failureCount,
    });
  } catch (error) {
    console.error("Send test notification error:", error);

    return res.status(500).json({
      error: "Failed to send test notification",
    });
  }
}

export async function sendNotification(req, res) {
  try {
    const { target = "all", userId, userIds, title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "title and body are required" });
    }

    // Every target must be checked. Anything unclear is rejected.
    // Never fall back to "send to everyone" by accident.
    let query;
    if (target === "all") {
      query = {}; // includes guests, since userId can be null
    } else if (target === "user") {
      if (!userId) {
        return res.status(400).json({ error: "userId is required when target is 'user'" });
      }
      query = { userId };
    } else if (target === "users") {
      if (!Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ error: "userIds must be a non-empty array when target is 'users'" });
      }
      query = { userId: { $in: userIds } };
    } else {
      return res.status(400).json({ error: "target must be 'all', 'user' or 'users'" });
    }

    const devices = await DeviceToken.find(query);

    if (!devices.length) {
      return res.status(404).json({ error: "No matching devices found" });
    }

    const tokens = devices.map((d) => d.token);

    const { successCount, failureCount, invalidTokens } = await sendInBatches(
      tokens,
      { title, body }
    );

    let invalidTokensRemoved = 0;
    if (invalidTokens.length) {
      const result = await DeviceToken.deleteMany({ token: { $in: invalidTokens } });
      invalidTokensRemoved = result.deletedCount;
    }

    return res.status(200).json({
      message: "Notification sent",
      successCount,
      failureCount,
      invalidTokensRemoved,
    });
  } catch (error) {
    console.error("Send notification error:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}