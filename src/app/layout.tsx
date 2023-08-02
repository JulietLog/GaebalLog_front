import React from "react";
import "./globals.css";
import type { Metadata } from "next";

import Provider from "@/components/provider/Provider";
import Header from "@/components/header/Header";
import { FONT_FAMILY } from "@/constants/global/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/hack-font/3.3.0/web/hack.css"
          rel="stylesheet"
        />
      </head>
      <body className={FONT_FAMILY.gothic}>
        <Provider>
          <Header />
          {children}
          <div id="portal" />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
