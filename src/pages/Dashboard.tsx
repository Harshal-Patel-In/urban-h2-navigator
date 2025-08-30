import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MapContainer } from "@/components/MapContainer";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { AnalyticsGrid } from "@/components/AnalyticsGrid";

export default function Dashboard() {
  const [activeFilters, setActiveFilters] = useState({
    hydrogenPlants: true,
    storage: true,
    pipelines: true,
    distributionHubs: true,
    renewableEnergy: false,
    demandCenters: false,
    transport: false,
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          filters={activeFilters}
          onFiltersChange={setActiveFilters}
        />
        
        <main className="flex-1 flex flex-col">
          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Map Section */}
            <div className="flex-1 relative">
              <MapContainer filters={activeFilters} />
            </div>
            
            {/* Right Panel */}
            <div className="w-80 bg-card border-l">
              <RecommendationPanel />
            </div>
          </div>
          
          {/* Analytics Section */}
          <div className="h-64 border-t bg-background">
            <AnalyticsGrid />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}