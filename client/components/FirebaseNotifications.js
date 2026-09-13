// "use client";

// import { useEffect } from "react";
// import { Capacitor } from "@capacitor/core";
// import { FirebaseMessaging } from "@capacitor-firebase/messaging";
// import { api } from "../lib/api";

// export default function FirebaseNotifications() {
//   useEffect(() => {
//     const setupNotifications = async () => {
//       // Run only inside the native Android/iOS app
//       if (!Capacitor.isNativePlatform()) {
//         return;
//       }

//       try {
//         // Check notification permission
//         let permission = await FirebaseMessaging.checkPermissions();

//         if (permission.receive !== "granted") {
//           permission = await FirebaseMessaging.requestPermissions();
//         }

//         if (permission.receive !== "granted") {
//           console.log("Notification permission not granted");
//           return;
//         }

//         // Get FCM token
//         const result = await FirebaseMessaging.getToken();

//         if (!result.token) {
//           console.log("FCM token not available");
//           return;
//         }

//         console.log("FCM Token:", result.token);

//         // Register token with backend
//         await api.registerDeviceToken({
//           token: result.token,
//           platform: "android",
//         });

//         console.log("FCM device token registered successfully");
//       } catch (error) {
//         console.error("Firebase notification setup failed:", error);
//       }
//     };

//     setupNotifications();
//   }, []);

//   return null;
// }




// -------------------------------------------------------------






// "use client";

// import { useEffect } from "react";
// import { Capacitor } from "@capacitor/core";
// import { FirebaseMessaging } from "@capacitor-firebase/messaging";
// import { api } from "../lib/api";

// export default function FirebaseNotifications() {
//   useEffect(() => {
//     if (!Capacitor.isNativePlatform()) {
//       return;
//     }

//     let receivedListener;
//     let actionListener;

//     const setupNotifications = async () => {
//       try {
//         // Check notification permission
//         let permission = await FirebaseMessaging.checkPermissions();

//         if (permission.receive !== "granted") {
//           permission = await FirebaseMessaging.requestPermissions();
//         }

//         if (permission.receive !== "granted") {
//           console.log("Notification permission not granted");
//           return;
//         }

//         // Get FCM token
//         const result = await FirebaseMessaging.getToken();

//         if (!result.token) {
//           console.log("FCM token not available");
//           return;
//         }

//         console.log("FCM token received");

//         // Register token with backend
//         await api.registerDeviceToken({
//           token: result.token,
//           platform: "android",
//         });

//         console.log("FCM device token registered successfully");

//         // --------------------------------
//         // Notification received
//         // --------------------------------
//         receivedListener =
//           await FirebaseMessaging.addListener(
//             "notificationReceived",
//             (notification) => {
//               console.log(
//                 "Notification received:",
//                 notification
//               );
//             }
//           );

//         // --------------------------------
//         // Notification tapped
//         // --------------------------------
//         actionListener =
//           await FirebaseMessaging.addListener(
//             "notificationActionPerformed",
//             (action) => {
//               console.log(
//                 "Notification tapped:",
//                 action
//               );

//               // Later we can use this
//               // to navigate to a specific screen.
//             }
//           );
//       } catch (error) {
//         console.error(
//           "Firebase notification setup failed:",
//           error
//         );
//       }
//     };

//     setupNotifications();

//     // Cleanup listeners when component unmounts
//     return () => {
//       receivedListener?.remove();
//       actionListener?.remove();
//     };
//   }, []);

//   return null;
// }




// ----------------------------------------------------------------------------







"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";
import { api } from "../lib/api";

export default function FirebaseNotifications() {
  const [debugStatus, setDebugStatus] = useState("");

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let receivedListener;
    let actionListener;

    const setupNotifications = async () => {
      try {
        setDebugStatus("Checking permission...");
        let permission = await FirebaseMessaging.checkPermissions();

        if (permission.receive !== "granted") {
          setDebugStatus("Requesting permission...");
          permission = await FirebaseMessaging.requestPermissions();
        }

        if (permission.receive !== "granted") {
          setDebugStatus("Permission NOT granted: " + permission.receive);
          console.log("Notification permission not granted");
          return;
        }

        setDebugStatus("Permission OK. Getting token...");
        const result = await FirebaseMessaging.getToken();

        if (!result.token) {
          setDebugStatus("No token received from Firebase");
          console.log("FCM token not available");
          return;
        }

        setDebugStatus("Token received. Registering with server...");
        console.log("FCM token received");

        await api.registerDeviceToken({
          token: result.token,
          platform: "android",
        });

        setDebugStatus("Registered successfully ✓");
        console.log("FCM device token registered successfully");

        receivedListener = await FirebaseMessaging.addListener(
          "notificationReceived",
          (notification) => {
            console.log("Notification received:", notification);
          }
        );

        actionListener = await FirebaseMessaging.addListener(
          "notificationActionPerformed",
          (action) => {
            console.log("Notification tapped:", action);
          }
        );
      } catch (error) {
        setDebugStatus("ERROR: " + (error?.message || String(error)));
        console.error("Firebase notification setup failed:", error);
      }
    };

    setupNotifications();

    return () => {
      receivedListener?.remove();
      actionListener?.remove();
    };
  }, []);

  return debugStatus ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#fff3cd",
        color: "#333",
        fontSize: 12,
        padding: "6px 10px",
        borderBottom: "1px solid #ffc107",
        wordBreak: "break-word",
      }}
    >
      🔔 Debug: {debugStatus}
    </div>
  ) : null;
}