import { env } from "@/config/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: env.NEXT_PUBLIC_APP_DESCRIPTION,
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: "/og.png",
  links: {
    github: "https://github.com/azpps",
  },
} as const;

export type SiteConfig = typeof siteConfig;
