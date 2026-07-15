import { Cinzel, Crimson_Pro } from "next/font/google";

export const headingFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

export const bodyFont = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});