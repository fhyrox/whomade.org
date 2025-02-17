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
  title: "whomade | Who Invented This?",
  description: "On this website you can find out who invented anything!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"><head>

    <link href="https://fonts.googleapis.com/css2?family=Capriola&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=League+Spartan&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Fascinate&display=swap" rel="stylesheet"/>

  </head>
  
      <body
      style={{background:'#f0f0f0'}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
