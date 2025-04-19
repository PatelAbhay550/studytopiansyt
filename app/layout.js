import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Study Topians | Youtube Channel",
  description: "Study Topians Youtube Channel, where you can find all the videos and notes related to Study.",
  keywords: [
    "Study Topians",
    "Youtube Channel",
    "Study Topians Youtube Channel",
    "Study Topians Youtube",
    "Study Topians Channel",
  ],
  authors: [
    {
      name: "Study Topians",
      url: "https://www.youtube.com/@StudyTopians",
    },
  ],
  creator: "Study Topians",
  publisher: "Study Topians",
  openGraph: {
    title: "Study Topians Youtube Channel",
    description: "Study Topians Youtube Channel, where you can find all the videos and notes related to Study.",
    url: "https://www.youtube.com/@StudyTopians",
    siteName: "Study Topians",
    images: [
      {
        url: "https://yt3.ggpht.com/gto9-jYyS8WXhYmDDfFsZ_aFs4pYI3Tg9bfLkJuh9GbtcxhFU57RQCBWKrxWbo6ySNgBRHlY=s800-c-k-c0x00ffffff-no-rj",
        width: 1200,
        height: 630,
        alt: "Study Topians Youtube Channel",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
