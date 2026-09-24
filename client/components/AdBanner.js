"use client";

import { useEffect } from "react";

const BANNER_AD_UNIT_ID = "ca-app-pub-6633214420260228/5812416608";

export default function AdBanner() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.Capacitor?.isNativePlatform?.()) {
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const { AdMob, BannerAdPosition, BannerAdSize } = await import(
          "@capacitor-community/admob"
        );

        await AdMob.initialize({
          initializeForTesting: false,
        });

        const consentInfo = await AdMob.requestConsentInfo().catch((err) => {
          console.warn("[AdBanner] Consent check failed (non-blocking):", err);
          return null;
        });

        if (consentInfo?.isConsentFormAvailable && consentInfo.status === "REQUIRED") {
          await AdMob.showConsentForm().catch((err) => {
            console.warn("[AdBanner] showConsentForm failed (non-blocking):", err);
          });
        }

        if (!mounted) return;

        await AdMob.showBanner({
          adId: BANNER_AD_UNIT_ID,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
        });
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