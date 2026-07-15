import "./globals.css";
import { bodyFont, headingFont } from "./fonts";

export const metadata = {
  title: "AetherFall — Medieval Game Docs",
  description: "Single-page docs & showcase for our Scratch RPG",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} noise text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}