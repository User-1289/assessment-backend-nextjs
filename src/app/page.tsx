import Image from "next/image";
import NavHeader from "@/components/NavHeader";
import AppSidebar from "@/components/AppSidebar";
import DashboardMetrics from "@/components/DashboardMetrics";
import CustSatisfaction from "@/components/CustSatisfaction";
import DashboardRevenue from "@/components/DashboardRevenue";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-64 fixed h-full z-10">
        <AppSidebar />
      </div>
      <main className="flex-1 ml-70 flex flex-col min-h-0">
        <NavHeader />
        <div className="flex-1 p-6 bg-gray-50 flex justify-start items-start">
          {/* Flex container for metrics and satisfaction */}
          <div className="flex flex-wrap space-x-3 space-y-6">
            <DashboardMetrics />
            <CustSatisfaction />
            <DashboardRevenue />
          </div>
        </div>
      </main>
    </div>
  );
}