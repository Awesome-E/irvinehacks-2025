import type { Metadata } from "next";
import { Aref_Ruqaa, Inter } from "next/font/google";
import "./globals.scss";

const arefRuqaa = Aref_Ruqaa({
  variable: '--font-aref-ruqaa',
  weight: ['400', '700'],
  subsets: ['latin-ext'],
})

const inter = Inter({
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: "GrocerEase",
  description: "Effortlessly track your groceries and reduce waste with GrocerEase"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} data-test={arefRuqaa.className}>
        {children}
      </body>
    </html>
  );
}
