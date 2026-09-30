import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./styles/globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "El Dawly Dessert — حلويات الدولي",
  description: "حلويات مصرية أصيلة من قلب مسله، الفيوم — كنافة، بقلاوة، أم علي وأكتر!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${tajawal.variable} antialiased bg-[#fdf9f5] text-[#2d2017]`} style={{ fontFamily: "var(--font-tajawal), 'Tajawal', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
