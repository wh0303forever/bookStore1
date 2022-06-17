import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.company.appname",
  appName: "My Capacitor App",
  webDir: "dist",
  server: {
    cleartext: true,
  },
};

export default config;
