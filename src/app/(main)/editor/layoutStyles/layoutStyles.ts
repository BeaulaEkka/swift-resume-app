// app/main/editor/layoutStyles/layoutStyles.ts

import { ResumeValues } from "@/lib/validation";

export interface LayoutProps {
  resumeData: ResumeValues;
}

export enum LayoutType {
  DEFAULT = "default",
  MODERN = "modern",
  MINIMAL = "minimal",
  CLEAN = "clean",
  ELEGANT = "elegant",
}

export { default as DefaultLayout } from "./DefaultLayout";
export { default as ModernLayout } from "./ModernLayout";
export { default as MinimalLayout } from "./MinimalLayout";
export { default as CleanLayout } from "./CleanLayout";
export { default as ElegantLayout } from "./ElegantLayout";
