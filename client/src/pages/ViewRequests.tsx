import { useState } from "react";
import { RequestCard } from "@/components/RequestCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ViewRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const mockRequests = [
    {
      id: "1",
      userName: "Sarah Johnson",
      isVerified: true,
      rating: 4.8,
      pickupLocation: "Main Campus Library",
      destination: "Downtown Shopping Mall",
      date: "Oct 5",
      time: "2:30 PM",
      passengers: 2,
      notes: "Prefer non-smoking drivers",
    },
    {
      id: "2",
      userName: "Alex Martinez",
      isVerified: true,
      rating: 4.9,
      pickupLocation: "Engineering Building",
      destination: "Airport Terminal 1",
      date: "Oct 6",
      time: "6:00 AM",
      passengers: 1,
      notes: "Early morning flight",
    },
    {
      id: "3",
      userName: "Emma Wilson",
      isVerified: false,
      rating: 4.2,
      pickupLocation: "Student Housing Block A",
      destination: "City Hospital",
      date: "Oct 5",
      time: "11:00 AM",
      passengers: 1,
    },
    {
      id: "4",
      userName: "James Lee",
      isVerified: true,
      rating: 4.7,
      pickupLocation: "Sports Complex",
      destination: "Beach Boardwalk",
      date: "Oct 7",
      time: "4:00 PM",
      passengers: 3,
      notes: "Going for weekend outing",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">View Requests</h1>
        <p className="text-muted-foreground">Browse ride requests from students</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search"
          />
        </div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-date-filter">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="tomorrow">Tomorrow</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2" data-testid="button-more-filters">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRequests.map((request) => (
          <RequestCard key={request.id} {...request} />
        ))}
      </div>

      {mockRequests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No requests found</p>
        </div>
      )}
    </div>
  );
}
