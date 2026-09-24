

// "use client";

// import { useEffect, useState } from "react";
// import { Capacitor } from "@capacitor/core";
// import { FirebaseMessaging } from "@capacitor-firebase/messaging";
// import { api } from "../lib/api";

// export default function FirebaseNotifications() {
//   const [debugStatus, setDebugStatus] = useState("");

//   useEffect(() => {
//     if (!Capacitor.isNativePlatform()) {
//       return;
//     }

//     let receivedListener;
//     let actionListener;

//     const setupNotifications = async () => {
//       try {
//         setDebugStatus("Checking permission...");
//         let permission = await FirebaseMessaging.checkPermissions();

//         if (permission.receive !== "granted") {
//           setDebugStatus("Requesting permission...");
//           permission = await FirebaseMessaging.requestPermissions();
//         }

//         if (permission.receive !== "granted") {
//           setDebugStatus("Permission NOT granted: " + permission.receive);
//           console.log("Notification permission not granted");
//           return;
//         }

//         setDebugStatus("Permission OK. Getting token...");
//         const result = await FirebaseMessaging.getToken();

//         if (!result.token) {
//           setDebugStatus("No token received from Firebase");
//           console.log("FCM token not available");
//           return;
//         }

//         setDebugStatus("Token received. Registering with server...");
//         console.log("FCM token received");

//         await api.registerDeviceToken({
//           token: result.token,
//           platform: "android",
//         });

//         setDebugStatus("Registered successfully ✓");
//         console.log("FCM device token registered successfully");

//         receivedListener = await FirebaseMessaging.addListener(
//           "notificationReceived",
//           (notification) => {
//             console.log("Notification received:", notification);
//           }
//         );

//         actionListener = await FirebaseMessaging.addListener(
//           "notificationActionPerformed",
//           (action) => {
//             console.log("Notification tapped:", action);
//           }
//         );
//       } catch (error) {
//         setDebugStatus("ERROR: " + (error?.message || String(error)));
//         console.error("Firebase notification setup failed:", error);
//       }
//     };

//     setupNotifications();

//     return () => {
//       receivedListener?.remove();
//       actionListener?.remove();
//     };
//   }, []);

//   return debugStatus ? (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 9999,
//         background: "#fff3cd",
//         color: "#333",
//         fontSize: 12,
//         padding: "6px 10px",
//         borderBottom: "1px solid #ffc107",
//         wordBreak: "break-word",
//       }}
//     >
//       🔔 Debug: {debugStatus}
//     </div>
//   ) : null;
// }







"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";
import { api } from "../lib/api";

export default function FirebaseNotifications() {
  const [debugStatus, setDebugStatus] = useState("");
  const [showDebug, setShowDebug] = useState(false);

  // The debug banner is OFF for normal users.
  // To turn it on: add ?debug=1 to the URL, or run
  // localStorage.setItem("showNotifDebug", "1") in the remote console.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("debug") === "1") {
        localStorage.setItem("showNotifDebug", "1");
      }
      if (params.get("debug") === "0") {
        localStorage.removeItem("showNotifDebug");
      }
      setShowDebug(localStorage.getItem("showNotifDebug") === "1");
    } catch {
      // storage not available, keep the banner hidden
    }
  }, []);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let cancelled = false;
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

        await api.registerDeviceToken({
          token: result.token,
          platform: "android",
        });

        setDebugStatus("Registered successfully ✓");
        console.log("FCM device token registered successfully");

        const received = await FirebaseMessaging.addListener(
          "notificationReceived",
          (notification) => {
            console.log("Notification received:", notification);
          }
        );

        const action = await FirebaseMessaging.addListener(
          "notificationActionPerformed",
          (actionEvent) => {
            console.log("Notification tapped:", actionEvent);
          }
        );

        // If the component was removed while we were waiting, clean up now
        if (cancelled) {
          received?.remove();
          action?.remove();
          return;
        }

        receivedListener = received;
        actionListener = action;
      } catch (error) {
        setDebugStatus("ERROR: " + (error?.message || String(error)));
        console.error("Firebase notification setup failed:", error);
      }
    };

    setupNotifications();

    return () => {
      cancelled = true;
      receivedListener?.remove();
      actionListener?.remove();
    };
  }, []);

  if (!showDebug || !debugStatus) {
    return null;
  }

  return (
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
  );
}