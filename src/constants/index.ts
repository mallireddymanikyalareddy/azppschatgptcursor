import { motionJs } from "@/design-system/tokens/motion";

export const APP_ROUTES = {
  home: "/",
  designSystem: "/design-system",
} as const;

export const ANIMATION = {
  duration: motionJs.duration,
  ease: motionJs.ease.standard,
} as const;
