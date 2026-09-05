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
        const { AdMob, BannerAdPosition, BannerAdSize } = await import(
          "@capacitor-community/admob"
        );

        await AdMob.initialize({
          testingDevices: [],
          initializeForTesting: true,
        });

        if (!mounted) return;

        await AdMob.showBanner({
          adId: TEST_BANNER_AD_UNIT_ID, // TODO: swap to REAL_BANNER_AD_UNIT_ID before release build
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
        });
      } catch (err) {
        console.error("AdMob banner failed to load:", err);
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