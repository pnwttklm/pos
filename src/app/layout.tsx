import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Post Office System",
  description: "Web App for Thai Post Office",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className='antialiased'
      >
        {children}
      </body>
    </html>
  );
}
