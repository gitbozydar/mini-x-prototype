"use client";

import Link from "next/link";
import "./globals.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="p-5 flex gap-5 items-center bg-black border-b border-b-gray-900">
          <Link href="/" className="font-medium ">
            Strona główna
          </Link>
          <Link href="/feed" className="font-medium">
            Posty
          </Link>
          <Link href="/add-post" className="font-medium">
            <Button size="small" variant="outlined" color="success">
              <AddIcon />
            </Button>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
