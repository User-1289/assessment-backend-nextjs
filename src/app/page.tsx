import Image from "next/image";
import NavHeader from "@/components/NavHeader";
import AppSidebar from "@/components/AppSidebar";
import DashboardMetrics from "@/components/DashboardMetrics";
export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-64 fixed h-full z-10">
        <AppSidebar />
      </div>
      <main className="flex-1 ml-64 flex flex-col min-h-0">
        <NavHeader />
        <div className="flex-1 p-6 bg-gray-50 flex justify-center">
          <div className="w-fit">
            <DashboardMetrics />
          </div>
        </div>
      </main>
    </div>
  );
}
