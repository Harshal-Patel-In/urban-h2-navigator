import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, DollarSign, Leaf, Star } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Riverside Industrial Hub",
    location: "Riverside County, CA",
    score: 92,
    roi: "28%",
    factors: {
      proximity: 95,
      demand: 88,
      regulatory: 94,
      cost: 87,
    },
    benefits: [
      "Close to 3 renewable sources",
      "High industrial demand",
      "Favorable zoning",
      "Low land costs"
    ],
    investment: "$45M",
    payback: "3.2 years",
    co2Reduction: "12,000 tons/year"
  },
  {
    id: 2,
    title: "Central Valley Storage",
    location: "Fresno County, CA",
    score: 87,
    roi: "22%",
    factors: {
      proximity: 82,
      demand: 89,
      regulatory: 91,
      cost: 85,
    },
    benefits: [
      "Strategic location",
      "Pipeline connectivity",
      "Government incentives",
      "Skilled workforce"
    ],
    investment: "$32M",
    payback: "4.1 years",
    co2Reduction: "8,500 tons/year"
  },
  {
    id: 3,
    title: "Port of Oakland Hub",
    location: "Oakland, CA",
    score: 84,
    roi: "25%",
    factors: {
      proximity: 78,
      demand: 95,
      regulatory: 86,
      cost: 76,
    },
    benefits: [
      "Major transport hub",
      "High H2 demand",
      "Port infrastructure",
      "Export potential"
    ],
    investment: "$58M",
    payback: "3.8 years",
    co2Reduction: "15,200 tons/year"
  }
];

export function RecommendationPanel() {
  return (
    <div className="h-full flex flex-col bg-gradient-card">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-gradient-secondary rounded-lg p-2">
            <Star className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Site Recommendations</h3>
            <p className="text-sm text-muted-foreground">AI-powered location analysis</p>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="shadow-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{rec.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{rec.location}</span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Badge variant="secondary" className="bg-gradient-secondary">
                      Score: {rec.score}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">ROI: {rec.roi}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Factor Scores */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Key Factors</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="flex justify-between">
                      <span>Proximity</span>
                      <span>{rec.factors.proximity}%</span>
                    </div>
                    <Progress value={rec.factors.proximity} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Demand</span>
                      <span>{rec.factors.demand}%</span>
                    </div>
                    <Progress value={rec.factors.demand} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Regulatory</span>
                      <span>{rec.factors.regulatory}%</span>
                    </div>
                    <Progress value={rec.factors.regulatory} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Cost</span>
                      <span>{rec.factors.cost}%</span>
                    </div>
                    <Progress value={rec.factors.cost} className="h-1" />
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <p className="text-sm font-medium mb-2">Key Benefits</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {rec.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-secondary rounded-full"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-muted/30 rounded-lg p-2">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-xs font-medium">{rec.investment}</p>
                  <p className="text-xs text-muted-foreground">Investment</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-3 w-3 text-secondary" />
                  </div>
                  <p className="text-xs font-medium">{rec.payback}</p>
                  <p className="text-xs text-muted-foreground">Payback</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <div className="flex items-center justify-center mb-1">
                    <Leaf className="h-3 w-3 text-accent" />
                  </div>
                  <p className="text-xs font-medium">{rec.co2Reduction}</p>
                  <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                </div>
              </div>

              <Button size="sm" className="w-full bg-gradient-primary hover:opacity-90">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}