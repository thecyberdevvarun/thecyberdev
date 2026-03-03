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
  // Core
  title: {
    default: "TheCyberDev — Think Like a Hacker, Code Like a Pro",
    template: "%s | TheCyberDev",
  },
  description:
    "Master cybersecurity through gamified coding challenges. Fix real vulnerabilities, earn XP, and build bulletproof code. Like LeetCode + TryHackMe — for developers.",

  // Keywords
  keywords: [
    "cybersecurity challenges",
    "secure coding",
    "gamified learning",
    "XSS challenges",
    "OWASP Top 10",
    "ethical hacking",
    "developer security training",
    "LeetCode for security",
    "TryHackMe alternative",
    "coding challenges",
    "penetration testing",
    "web security",
    "bug bounty training",
    "secure code review",
  ],

  // Authors & Publisher
  authors: [{ name: "TheCyberDev Team", url: "https://thecyberdev.com" }],
  creator: "TheCyberDev",
  publisher: "TheCyberDev",

  // Canonical URL
  metadataBase: new URL("https://thecyberdev.com"),
  alternates: {
    canonical: "/",
  },

  // Open Graph (Facebook, LinkedIn, Discord previews)
  openGraph: {
    type: "website",
    url: "https://thecyberdev.com",
    title: "TheCyberDev — Think Like a Hacker, Code Like a Pro",
    description:
      "Master cybersecurity through gamified coding challenges. Fix real vulnerabilities, earn XP, and build bulletproof code. Join 10K+ developers today.",
    siteName: "TheCyberDev",
    images: [
      {
        url: "/og-image.png", // Add a 1200x630 image to your /public folder
        width: 1200,
        height: 630,
        alt: "TheCyberDev — Gamified Cybersecurity Challenges for Developers",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "TheCyberDev — Think Like a Hacker, Code Like a Pro",
    description:
      "Master cybersecurity through gamified coding challenges. Fix real vulnerabilities, earn XP, and build bulletproof code.",
    images: ["/og-image.png"], // Same image as OG
    creator: "@thecyberdev", // Replace with your actual Twitter handle
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // App specific
  category: "technology",
  applicationName: "TheCyberDev",
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
