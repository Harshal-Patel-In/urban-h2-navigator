import { useState } from "react";
import { 
  Settings, 
  Layers, 
  Filter, 
  Zap, 
  MapPin, 
  Fuel, 
  Building2,
  Leaf,
  Truck,
  Target
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppSidebarProps {
  filters: {
    hydrogenPlants: boolean;
    storage: boolean;
    pipelines: boolean;
    distributionHubs: boolean;
    renewableEnergy: boolean;
    demandCenters: boolean;
    transport: boolean;
  };
  onFiltersChange: (filters: any) => void;
}

export function AppSidebar({ filters, onFiltersChange }: AppSidebarProps) {
  const [proximityRadius, setProximityRadius] = useState([50]);
  const [roiThreshold, setRoiThreshold] = useState([15]);

  const toggleFilter = (key: string) => {
    onFiltersChange({
      ...filters,
      [key]: !filters[key as keyof typeof filters],
    });
  };

  const layerItems = [
    { key: 'hydrogenPlants', label: 'Hydrogen Plants', icon: Fuel, color: 'text-primary' },
    { key: 'storage', label: 'Storage Facilities', icon: Building2, color: 'text-secondary' },
    { key: 'pipelines', label: 'Pipeline Network', icon: MapPin, color: 'text-accent' },
    { key: 'distributionHubs', label: 'Distribution Hubs', icon: Target, color: 'text-primary' },
    { key: 'renewableEnergy', label: 'Renewable Sources', icon: Leaf, color: 'text-secondary' },
    { key: 'demandCenters', label: 'Demand Centers', icon: Zap, color: 'text-accent' },
    { key: 'transport', label: 'Transport Routes', icon: Truck, color: 'text-muted-foreground' },
  ];

  return (
    <Sidebar className="w-80 border-r">
      <SidebarHeader className="border-b bg-gradient-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary rounded-lg p-2">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">HydrogenPlan</h2>
              <p className="text-sm text-muted-foreground">Planning Dashboard</p>
            </div>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        {/* Map Layers */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-2">
            <Layers className="h-4 w-4" />
            <span>Map Layers</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            {layerItems.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <Label htmlFor={item.key} className="text-sm">
                    {item.label}
                  </Label>
                </div>
                <Switch
                  id={item.key}
                  checked={filters[item.key as keyof typeof filters]}
                  onCheckedChange={() => toggleFilter(item.key)}
                />
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter Controls */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter Controls</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            {/* Region Filter */}
            <div className="space-y-2">
              <Label className="text-sm">Region</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="midwest">Midwest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Proximity Radius */}
            <div className="space-y-2">
              <Label className="text-sm">Proximity Radius: {proximityRadius[0]}km</Label>
              <Slider
                value={proximityRadius}
                onValueChange={setProximityRadius}
                max={200}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            {/* ROI Threshold */}
            <div className="space-y-2">
              <Label className="text-sm">Min ROI: {roiThreshold[0]}%</Label>
              <Slider
                value={roiThreshold}
                onValueChange={setRoiThreshold}
                max={50}
                min={5}
                step={1}
                className="w-full"
              />
            </div>

            {/* Project Stage */}
            <div className="space-y-2">
              <Label className="text-sm">Project Stage</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="construction">Under Construction</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <Settings className="h-4 w-4" />
                  Export Analysis
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start">
                  <MapPin className="h-4 w-4" />
                  Save View
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}