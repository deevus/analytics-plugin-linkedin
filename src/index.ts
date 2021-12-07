import { AnalyticsInstance, AnalyticsPlugin } from "analytics";
import { isScriptLoaded } from "analytics-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Metadata = Record<string, any>;

interface LinkedInStatic {
  (a: string, b: string): void;
  q: [];

  (method: string, options: Record<string, any>): void;
  (method: "track", options: { conversion_id: string }): void;
}

declare global {
  interface Window {
    _linkedin_data_partner_ids?: string[];
    lintrk?: LinkedInStatic;
  }
}

export interface LinkedInPluginConfig {
  partnerId: string;
}

interface Params {
  payload: {
    userId: string;
    traits: Metadata;
  };
  config: LinkedInPluginConfig;
}

const scriptSrc = "https://snap.licdn.com/li.lms-analytics/insight.min.js";

export interface LinkedInPluginBrowserInstance {
  conversion(conversion_id: string): void;
}

const linkedinPlugin = (config: LinkedInPluginConfig): AnalyticsPlugin => {
  const sharedConfig = {
    name: "linkedin",
    config,
  };

  if (process.env.BROWSER) {
    return {
      ...sharedConfig,

      initialize({ config }: Params): void {
        if (!config.partnerId) {
          throw new Error("No LinkedIn partnerId defined");
        }

        window._linkedin_data_partner_ids =
          window._linkedin_data_partner_ids ?? [];
        window._linkedin_data_partner_ids.push(config.partnerId);

        const scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.src = scriptSrc;
        scriptElement.async = true;

        const target = document.getElementsByTagName("script")[0];
        target.parentNode?.insertBefore(scriptElement, target);
      },

      loaded() {
        return isScriptLoaded(scriptSrc);
      },

      methods: {
        conversion(this: { instance: AnalyticsInstance }, conversion_id) {
          window.lintrk?.("track", { conversion_id });
        },
      } as LinkedInPluginBrowserInstance,
    };
  } else {
    // TODO: Node API
    return sharedConfig;
  }
};

export default linkedinPlugin;
