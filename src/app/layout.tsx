import { ReactNode } from "react";
import type { Metadata } from "next";
import { openSans } from "./fonts";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import Header from "@/components/nav/header";
import Footer from "@/components/footer";
import Popup from "@/components/@modals";
import EmailSubscribe from "@/components/email-subscribe";
import BottomNav from "@/components/nav/bottom";
import ModalContext from "@/context/modal";
import ToastContext from "@/context/toast";
import FirebaseUserContext from "@/context/firebase-user";
import CartProvider from "@/context/cart";

export const metadata: Metadata = {
   title: "CHAWKBAZAR CLONE",
   description: "Generated by create next app",
};

export default function RootLayout({
   children
}: Readonly<{
   children: ReactNode
}>) {
   return (
      <html lang="en">
         <body className={openSans.className}>
            <NextTopLoader color="rgb(33, 33, 33)" height={5} />
            <FirebaseUserContext>
               <CartProvider>
                  <ModalContext>
                     <ToastContext>       
                        <Header />
                        <main>{children}</main>
                        <Popup />
                     </ToastContext>
                     <BottomNav />
                  </ModalContext>
               </CartProvider>
            </FirebaseUserContext>
            <div className="wrapper1920 mx-auto">
               <EmailSubscribe />
            </div>
            <Footer />
         </body>
      </html>
   );
}
