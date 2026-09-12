import DeviceToken from "../models/DeviceToken.js";
import { getMessaging } from "firebase-admin/messaging";
import admin from "../config/firebaseAdmin.js";

export async function registerDeviceToken(req, res) {
  try {
    const { token, platform = "android" } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "FCM token is required",
      });
    }

    const deviceToken = await DeviceToken.findOneAndUpdate(
      { token },
      {
        userId: req.userId,
        platform,
      },
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

    const message = {
      notification: {
        title: "Radha Naam Jap 🙏",
        body: "Your Naam Jap journey continues. Radhe Radhe!",
      },
      tokens,
    };

    const response = await getMessaging(admin).sendEachForMulticast(message);

    return res.status(200).json({
      message: "Test notification sent",
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error) {
    console.error("Send test notification error:", error);

    return res.status(500).json({
      error: "Failed to send test notification",
    });
  }
}


// Addes this new function on 13/09/26


export async function sendNotification(req, res) {
  try {
    const { target = "all", userId, userIds, title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "title and body are required" });
    }

    let query = {};
    if (target === "user" && userId) {
      query = { userId };
    } else if (target === "users" && Array.isArray(userIds)) {
      query = { userId: { $in: userIds } };
    }
    // target === "all" -> query stays {} (includes guests, since userId can be null)

    const devices = await DeviceToken.find(query);

    if (!devices.length) {
      return res.status(404).json({ error: "No matching devices found" });
    }

    const tokens = devices.map((d) => d.token);
    const message = {
      notification: { title, body },
      tokens,
    };

    const response = await getMessaging(admin).sendEachForMulticast(message);

    const invalidTokens = [];
    response.responses.forEach((r, i) => {
      if (!r.success && (r.error?.code === "messaging/registration-token-not-registered" || r.error?.code === "messaging/invalid-registration-token")) {
        invalidTokens.push(tokens[i]);
      }
    });

    let invalidTokensRemoved = 0;
    if (invalidTokens.length) {
      const result = await DeviceToken.deleteMany({ token: { $in: invalidTokens } });
      invalidTokensRemoved = result.deletedCount;
    }

    return res.status(200).json({
      message: "Notification sent",
      successCount: response.successCount,
      failureCount: response.failureCount,
      invalidTokensRemoved,
    });
  } catch (error) {
    console.error("Send notification error:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}