import { useState } from "react";
import { InviteCard } from "@/components/InviteCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
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

  const { data: invites = [], isLoading } = useQuery({
    queryKey: ["carpool-invites"],
    queryFn: async () => {
      const response = await fetch("/api/carpool-invites");
      if (!response.ok) {
        throw new Error("Failed to fetch invites");
      }
      return response.json();
    },
  });

  const filteredInvites = invites.filter((invite: any) => {
    const matchesSearch = 
      searchQuery === "" ||
      invite.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invite.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

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

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading invites...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvites.map((invite: any) => (
            <InviteCard 
              key={invite.id}
              id={invite.id}
              userName="Anonymous User"
              isVerified={true}
              rating={4.5}
              pickupLocation={invite.pickupLocation}
              destination={invite.destination}
              date={invite.date}
              time={invite.time}
              availableSeats={invite.availableSeats}
              notes={invite.notes}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredInvites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No invites found</p>
        </div>
      )}
    </div>
  );
}
