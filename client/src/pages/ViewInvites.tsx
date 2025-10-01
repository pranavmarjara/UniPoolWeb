import { useState } from "react";
import { InviteCard } from "@/components/InviteCard";
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

export default function ViewInvites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const mockInvites = [
    {
      id: "1",
      userName: "Mike Chen",
      isVerified: true,
      rating: 4.9,
      pickupLocation: "North Campus Dorms",
      destination: "City Center Station",
      date: "Oct 6",
      time: "8:00 AM",
      availableSeats: 3,
      notes: "Leaving right after morning class",
    },
    {
      id: "2",
      userName: "Lisa Taylor",
      isVerified: true,
      rating: 4.8,
      pickupLocation: "Science Building",
      destination: "Mountain Trail Park",
      date: "Oct 7",
      time: "9:00 AM",
      availableSeats: 2,
      notes: "Weekend hiking trip",
    },
    {
      id: "3",
      userName: "David Kim",
      isVerified: true,
      rating: 4.6,
      pickupLocation: "Main Gate",
      destination: "Shopping District",
      date: "Oct 5",
      time: "3:00 PM",
      availableSeats: 1,
    },
    {
      id: "4",
      userName: "Rachel Green",
      isVerified: false,
      rating: 4.3,
      pickupLocation: "Arts Center",
      destination: "Concert Hall Downtown",
      date: "Oct 8",
      time: "7:00 PM",
      availableSeats: 2,
      notes: "Going to evening concert",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">View Invites</h1>
        <p className="text-muted-foreground">Find available rides to join</p>
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
        {mockInvites.map((invite) => (
          <InviteCard key={invite.id} {...invite} />
        ))}
      </div>

      {mockInvites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No invites found</p>
        </div>
      )}
    </div>
  );
}
