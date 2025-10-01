import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPinned, Car, PlusCircle, UserPlus, TrendingUp, Users, Shield } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      return response.json();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-welcome">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your carpools today</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <MapPinned className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-active-requests">
              {stats?.activeRequests ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">Looking for rides</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Rides</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-available-rides">
              {stats?.activeInvites ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">Drivers offering seats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rides Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-rides-completed">
              {stats?.ridesCompleted ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">Total completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/raise-request">
          <Card className="hover-elevate cursor-pointer" data-testid="card-raise-request">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-primary text-primary-foreground">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Raise Request</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Need a ride? Post your request</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/raise-invite">
          <Card className="hover-elevate cursor-pointer" data-testid="card-raise-invite">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-chart-2 text-white">
                  <UserPlus className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Raise Invite</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Have extra seats? Offer a ride</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/requests">
          <Card className="hover-elevate cursor-pointer" data-testid="card-view-requests">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-accent text-accent-foreground">
                  <MapPinned className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">View Requests</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Browse ride requests from students</CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/invites">
          <Card className="hover-elevate cursor-pointer" data-testid="card-view-invites">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-accent text-accent-foreground">
                  <Car className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">View Invites</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Find available rides to join</CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-chart-2" />
            Safety First
          </CardTitle>
          <CardDescription>Tips for safe carpooling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Always verify the driver or passenger before starting your ride
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Share your trip details with a friend or family member
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Meet in well-lit, public areas when possible
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-chart-2 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              Trust your instincts - if something feels off, cancel the ride
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
