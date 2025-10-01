import { useState } from "react";
import { RequestCard } from "@/components/RequestCard";
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

export default function ViewRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["carpool-requests"],
    queryFn: async () => {
      const response = await fetch("/api/carpool-requests");
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      return response.json();
    },
  });

  const filteredRequests = requests.filter((request: any) => {
    const matchesSearch = 
      searchQuery === "" ||
      request.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

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

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading requests...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request: any) => (
            <RequestCard 
              key={request.id} 
              id={request.id}
              pickupLocation={request.pickupLocation}
              destination={request.destination}
              date={request.date}
              time={request.time}
              passengers={request.passengers}
              notes={request.notes}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No requests found</p>
        </div>
      )}
    </div>
  );
}
