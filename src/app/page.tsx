import Image from "next/image";
import NavHeader from "@/components/NavHeader";
import AppSidebar from "@/components/AppSidebar";
export default function Home() {
  return (
    <div className="flex flex-col h-screen">

      <div className="flex flex-1">
        <div className=" md:block fixed h-full">
          <AppSidebar />
        </div>
        <main className="flex-1 p-4">
          <NavHeader />
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
}
