import type { Metadata } from "next";
import { getHome } from "@/lib/content";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getHome();
  return {
    title: settings.seo.title ?? "NON STOP — Stay Nonstop",
    description: settings.seo.description ?? "NON STOP energy drink — products, partnerships, events and blogs.",
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
