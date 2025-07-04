"use client";

import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import SecurityProtection from "./utils/SecurityProtection";
import { useEffect } from "react";
import socketIO from "socket.io-client";
const socketId = socketIO(
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "http://localhost:3000",
  {
    transports: ["websocket"],
  }
);

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} antialiased !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 `}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
              {/* <SecurityProtection /> */}
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, refetch } = useLoadUserQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    // Refetch user data when the component mounts
    refetch();
  }, []);

  // make socket connection and handle error
  useEffect(() => {
    socketId.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);
    });
    socketId.on("connection", () => {
      console.log("connected");
    });
  }, []);

  return isLoading ? <Loader /> : <>{children}</>;
};
