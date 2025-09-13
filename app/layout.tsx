import type { Metadata } from "next"
import { Geist, Playball, Roboto } from "next/font/google"
import "./styles/globals.scss"
import { CartProvider } from "@/context/CartContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const playballSans = Playball({
  weight: "400",
  variable: "--font-playball",
  subsets: ["latin"],
})

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Flower Delivery App",
  description: "Fast and fresh flower delivery right to your doorstep",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playballSans.variable} ${roboto.variable}`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
