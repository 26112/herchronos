
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4f13694b83d1474098fff315bc32947b',
  appName: 'herchronos',
  webDir: 'dist',
  server: {
    url: 'https://4f13694b-83d1-4740-98ff-f315bc32947b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f7f7f8",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#e95ca0",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
