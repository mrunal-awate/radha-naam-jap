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