import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fuel, Building2, MapPin, Target, Leaf, Zap, Truck } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDmyAIbvxmxG_djE92YxPWnXvbdGYr3NCM';

interface MapContainerProps {
  filters: {
    hydrogenPlants: boolean;
    storage: boolean;
    pipelines: boolean;
    distributionHubs: boolean;
    renewableEnergy: boolean;
    demandCenters: boolean;
    transport: boolean;
  };
}

// Mock data for map markers
const mapData = {
  hydrogenPlants: [
    { id: 1, lat: 34.0522, lng: -118.2437, name: "LA Hydrogen Hub", capacity: "50 MW", status: "Operational" },
    { id: 2, lat: 37.7749, lng: -122.4194, name: "SF Bay Facility", capacity: "75 MW", status: "Planning" },
    { id: 3, lat: 32.7157, lng: -117.1611, name: "San Diego Plant", capacity: "30 MW", status: "Construction" },
  ],
  storage: [
    { id: 4, lat: 34.1478, lng: -118.1445, name: "Pasadena Storage", capacity: "100 tons", status: "Operational" },
    { id: 5, lat: 37.8044, lng: -122.2711, name: "Oakland Storage", capacity: "150 tons", status: "Planning" },
  ],
  distributionHubs: [
    { id: 6, lat: 34.0928, lng: -118.4059, name: "West LA Hub", throughput: "20 tons/day", status: "Operational" },
    { id: 7, lat: 37.7849, lng: -122.4094, name: "Downtown SF Hub", throughput: "35 tons/day", status: "Construction" },
  ],
  renewableEnergy: [
    { id: 8, lat: 35.6870, lng: -119.7727, name: "Kern Wind Farm", capacity: "200 MW", type: "Wind" },
    { id: 9, lat: 33.6847, lng: -116.2792, name: "Desert Solar Array", capacity: "150 MW", type: "Solar" },
  ],
  demandCenters: [
    { id: 10, lat: 33.8121, lng: -117.9190, name: "Industrial District", demand: "45 tons/day", sector: "Manufacturing" },
    { id: 11, lat: 37.7899, lng: -122.3905, name: "Port Complex", demand: "60 tons/day", sector: "Logistics" },
  ],
};

export function MapContainer({ filters }: MapContainerProps) {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const getMarkerIcon = (type: string) => {
    const iconMap = {
      hydrogenPlants: { icon: Fuel, color: 'text-primary' },
      storage: { icon: Building2, color: 'text-secondary' },
      distributionHubs: { icon: Target, color: 'text-accent' },
      renewableEnergy: { icon: Leaf, color: 'text-secondary' },
      demandCenters: { icon: Zap, color: 'text-accent' },
    };
    return iconMap[type as keyof typeof iconMap] || { icon: MapPin, color: 'text-muted-foreground' };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'bg-secondary';
      case 'Construction': return 'bg-accent';
      case 'Planning': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const renderMarkers = () => {
    const markers: JSX.Element[] = [];

    Object.entries(filters).forEach(([filterKey, isActive]) => {
      if (isActive && mapData[filterKey as keyof typeof mapData]) {
        const data = mapData[filterKey as keyof typeof mapData];
        data.forEach((item: any) => {
          markers.push(
            <Marker
              key={`${filterKey}-${item.id}`}
              position={{ lat: item.lat, lng: item.lng }}
              onClick={() => setSelectedMarker({ ...item, type: filterKey })}
            />
          );
        });
      }
    });

    return markers;
  };

  return (
    <div className="h-full w-full relative">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={{ lat: 34.0522, lng: -118.2437 }}
          defaultZoom={8}
          className="h-full w-full"
          mapId="hydrogen-planning-map"
        >
          {renderMarkers()}
          
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <Card className="w-64 border-0 shadow-none">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const { icon: Icon, color } = getMarkerIcon(selectedMarker.type);
                        return <Icon className={`h-4 w-4 ${color}`} />;
                      })()}
                      <h4 className="font-semibold text-sm">{selectedMarker.name}</h4>
                    </div>
                    {selectedMarker.status && (
                      <Badge className={`text-xs ${getStatusColor(selectedMarker.status)}`}>
                        {selectedMarker.status}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {selectedMarker.capacity && (
                      <p className="text-xs text-muted-foreground">
                        Capacity: {selectedMarker.capacity}
                      </p>
                    )}
                    {selectedMarker.throughput && (
                      <p className="text-xs text-muted-foreground">
                        Throughput: {selectedMarker.throughput}
                      </p>
                    )}
                    {selectedMarker.demand && (
                      <p className="text-xs text-muted-foreground">
                        Demand: {selectedMarker.demand}
                      </p>
                    )}
                    {selectedMarker.type && (
                      <p className="text-xs text-muted-foreground">
                        Type: {selectedMarker.type}
                      </p>
                    )}
                    {selectedMarker.sector && (
                      <p className="text-xs text-muted-foreground">
                        Sector: {selectedMarker.sector}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-card">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-primary rounded-lg p-2">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Interactive Map</p>
            <p className="text-xs text-muted-foreground">Hydrogen Infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  );
}