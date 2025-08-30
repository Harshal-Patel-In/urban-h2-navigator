import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Zap, MapPin, Leaf, Users, Target } from "lucide-react";

export function AnalyticsGrid() {
  const kpis = [
    {
      title: "Estimated ROI",
      value: "24.3%",
      change: "+3.2%",
      trend: "up",
      icon: DollarSign,
      description: "Average return on investment",
      progress: 78,
    },
    {
      title: "Demand Forecast",
      value: "285 tons/day",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      description: "Projected H₂ demand by 2025",
      progress: 65,
    },
    {
      title: "Land Usage Efficiency",
      value: "92%",
      change: "+5.1%",
      trend: "up",
      icon: MapPin,
      description: "Optimal site utilization",
      progress: 92,
    },
    {
      title: "CO₂ Reduction",
      value: "45,000 tons",
      change: "+8.7%",
      trend: "up",
      icon: Leaf,
      description: "Annual carbon savings",
      progress: 83,
    },
    {
      title: "Active Projects",
      value: "127",
      change: "+15",
      trend: "up",
      icon: Target,
      description: "Projects in pipeline",
      progress: 68,
    },
    {
      title: "Network Coverage",
      value: "78%",
      change: "-2.1%",
      trend: "down",
      icon: Zap,
      description: "Infrastructure coverage",
      progress: 78,
    },
  ];

  return (
    <div className="h-full p-4 bg-background">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
        <p className="text-sm text-muted-foreground">Key performance indicators for hydrogen ecosystem planning</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 h-[calc(100%-4rem)]">
        {kpis.map((kpi, index) => (
          <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${
                  kpi.trend === 'up' ? 'bg-secondary/10' : 'bg-muted/50'
                }`}>
                  <kpi.icon className={`h-4 w-4 ${
                    kpi.trend === 'up' ? 'text-secondary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className={`flex items-center text-xs ${
                  kpi.trend === 'up' ? 'text-secondary' : 'text-destructive'
                }`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.title}</p>
                </div>
                
                <Progress 
                  value={kpi.progress} 
                  className="h-1"
                />
                
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}