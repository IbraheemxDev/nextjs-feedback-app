

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#312e81_0%,#0f172a_35%,#020617_100%)]">
      <Navbar />

      {children}

      <Footer />
    </div>

  );
}
