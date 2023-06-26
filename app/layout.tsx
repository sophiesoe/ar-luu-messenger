import ActiveStatus from "./commons/active/ActiveStatus";
import AuthContext from "./context/AuthContext";
import ToastContext from "./context/ToastContext";
import "./globals.css";
import localFont from "next/font/local";

const waLone = localFont({
  src: [
    {
      path: "../public/fonts/walone.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/walone.ttf",
      style: "italic",
    },
  ],
});

export const metadata = {
  title: "Ar Luu Messenger",
  keywords: ["messenger", "talk chat", "conversation", "ar-luu", "potato"],
  description:
    "A place where all your words should be laid on without distraction",
  url: "https://ar-luu-messenger.vercel.app/",
  openGraph: {
    images: [
      {
        url: "https://ar-luu-messenger.vercel.app/images/arr-luu.png",
        width: 800,
        height: 600,
        alt: "Ar Luu Messenger",
      },
      {
        url: "https://ar-luu-messenger.vercel.app/images/arr-luu.png",
        width: 1800,
        height: 1600,
        alt: "Ar Luu Messenger",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    images: [
      {
        url: "https://ar-luu-messenger.vercel.app/images/arr-luu.png",
        width: 800,
        height: 600,
        alt: "Ar Luu Messenger",
      },
      {
        url: "https://ar-luu-messenger.vercel.app/images/arr-luu.png",
        width: 1800,
        height: 1600,
        alt: "Ar Luu Messenger",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={waLone.className}>
        <AuthContext>
          <ToastContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
