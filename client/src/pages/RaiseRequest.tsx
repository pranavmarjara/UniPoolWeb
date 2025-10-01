import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Clock, Users, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function RaiseRequest() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    passengers: "1",
    notes: "",
  });

  const createRequestMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/carpool-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "temp-user-id", // TODO: Get from auth context
          pickupLocation: data.pickupLocation,
          destination: data.destination,
          date: data.date,
          time: data.time,
          passengers: parseInt(data.passengers),
          notes: data.notes || null,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create request");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Posted!",
        description: "Your ride request has been posted successfully.",
      });
      setFormData({
        pickupLocation: "",
        destination: "",
        date: "",
        time: "",
        passengers: "1",
        notes: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRequestMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Raise a Request</h1>
          <p className="text-muted-foreground">Post a ride request and find drivers heading your way</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Fill in your trip information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Pickup Location
                  </div>
                </Label>
                <Input
                  id="pickupLocation"
                  name="pickupLocation"
                  placeholder="e.g., Main Campus Library"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  data-testid="input-pickup"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Destination
                  </div>
                </Label>
                <Input
                  id="destination"
                  name="destination"
                  placeholder="e.g., Downtown Shopping Mall"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  data-testid="input-destination"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date
                    </div>
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    data-testid="input-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time
                    </div>
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    data-testid="input-time"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Number of Passengers
                  </div>
                </Label>
                <Input
                  id="passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  max="8"
                  value={formData.passengers}
                  onChange={handleChange}
                  required
                  data-testid="input-passengers"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any preferences or special requirements..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  data-testid="textarea-notes"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gap-2" 
                data-testid="button-submit"
                disabled={createRequestMutation.isPending}
              >
                <Send className="h-4 w-4" />
                {createRequestMutation.isPending ? "Posting..." : "Post Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
