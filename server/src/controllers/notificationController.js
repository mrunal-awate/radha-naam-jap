import DeviceToken from "../models/DeviceToken.js";

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