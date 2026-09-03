"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";
import { api } from "../lib/api";

export default function FirebaseNotifications() {
  useEffect(() => {
    const setupNotifications = async () => {
      // Run only inside the native Android/iOS app
      if (!Capacitor.isNativePlatform()) {
        return;
      }

      try {
        // Check notification permission
        let permission = await FirebaseMessaging.checkPermissions();

        if (permission.receive !== "granted") {
          permission = await FirebaseMessaging.requestPermissions();
        }

        if (permission.receive !== "granted") {
          console.log("Notification permission not granted");
          return;
        }

        // Get FCM token
        const result = await FirebaseMessaging.getToken();

        if (!result.token) {
          console.log("FCM token not available");
          return;
        }

        console.log("FCM Token:", result.token);

        // Register token with backend
        await api.registerDeviceToken({
          token: result.token,
          platform: "android",
        });

        console.log("FCM device token registered successfully");
      } catch (error) {
        console.error("Firebase notification setup failed:", error);
      }
    };

    setupNotifications();
  }, []);

  return null;
}