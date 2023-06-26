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
  description: "messenger talk chat conversation ar-luu potato",
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
