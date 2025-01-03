import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import Nav from "@/components/nav";
import SocialLogin from "@/components/common/SocialLogin";
import { Toaster } from "@/components/ui/sonner";

const font = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="hydrated scroll-smooth"
      data-new-gr-c-s-check-loaded="14.1211.0"
      data-gr-ext-installed=""
    >
      <body className={`${font.className} antialiased scroll-smooth `}>
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
        <Toaster position="bottom-right" expand={true} richColors />
        <SocialLogin />
      </body>
    </html>
  );
}
