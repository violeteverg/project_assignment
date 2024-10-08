import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "./providers/ReactQueryProvider";
import { Toaster } from "./components/ui/toaster";
import { MainStoreProvider } from "./providers/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Assingment",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProviders>
      <html lang='en'>
        <body className={inter.className}>
          <MainStoreProvider>
            <main className='relative flex flex-col h-full'>{children}</main>
          </MainStoreProvider>
          <Toaster />
        </body>
      </html>
    </ReactQueryProviders>
  );
}
