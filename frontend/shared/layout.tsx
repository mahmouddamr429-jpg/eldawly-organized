import type { Metadata } from "next";
import "./styles/globals.css";

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
      <body className="antialiased bg-[#fdf9f5] text-[#2d2017]" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
