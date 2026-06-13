import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import FloatingChat from "./ai-chat/page";


export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FloatingChat></FloatingChat>
    </>
  );
}