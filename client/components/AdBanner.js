"use client";

import { useEffect } from "react";

const TEST_BANNER_AD_UNIT_ID = "ca-app-pub-3940256099942544/6300978111";
const REAL_BANNER_AD_UNIT_ID = "ca-app-pub-6633214420260228/5812416608";

export default function AdBanner() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.Capacitor?.isNativePlatform?.()) {
      return;
    }

    let mounted = true;

    (async () => {
      try {
        console.log("[AdBanner] Starting AdMob setup...");
        const { AdMob, BannerAdPosition, BannerAdSize } = await import(
          "@capacitor-community/admob"
        );

        await AdMob.initialize({
          testingDevices: [],
          initializeForTesting: true,
        });
        console.log("[AdBanner] AdMob initialized");

        const consentInfo = await AdMob.requestConsentInfo().catch((err) => {
          console.warn("[AdBanner] Consent check failed (non-blocking):", err);
          return null;
        });
        console.log("[AdBanner] Consent info:", JSON.stringify(consentInfo));

        if (consentInfo?.isConsentFormAvailable && consentInfo.status === "REQUIRED") {
          await AdMob.showConsentForm().catch((err) => {
            console.warn("[AdBanner] showConsentForm failed (non-blocking):", err);
          });
        }

        if (!mounted) return;

        console.log("[AdBanner] Calling showBanner...");
        await AdMob.showBanner({
          adId: REAL_BANNER_AD_UNIT_ID,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
        });
        console.log("[AdBanner] showBanner call completed successfully");
      } catch (err) {
        console.error("[AdBanner] AdMob banner failed to load:", err);
      }
    })();

    return () => {
      mounted = false;
      import("@capacitor-community/admob")
        .then(({ AdMob }) => AdMob.removeBanner())
        .catch(() => {});
    };
  }, []);

  return null;
}