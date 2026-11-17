import type { Metadata } from "next";
import { getHome } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  // Site-wide defaults; every page sets its own title, description and share tags from its CMS "SEO" tab.
  const { settings } = await getHome();
  return {
    metadataBase: new URL(siteUrl()),
    title: settings.seo.title ?? "NON STOP — Stay Nonstop",
    description: settings.seo.description ?? "NON STOP energy drink — products, partnerships, events and blogs.",
    applicationName: settings.site_name,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
