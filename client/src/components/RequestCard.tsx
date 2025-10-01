import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Star, ShieldCheck } from "lucide-react";

interface RequestCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  isVerified: boolean;
  rating: number;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  notes?: string;
}

export function RequestCard({
  userName,
  userAvatar,
  isVerified,
  rating,
  pickupLocation,
  destination,
  date,
  time,
  passengers,
  notes,
}: RequestCardProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="hover-elevate" data-testid={`card-request-${userName}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm" data-testid="text-username">
                {userName}
              </p>
              {isVerified && (
                <ShieldCheck className="h-4 w-4 text-chart-2" data-testid="icon-verified" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-chart-4 text-chart-4" />
              <span data-testid="text-rating">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="text-sm">
              <p className="font-medium" data-testid="text-pickup">{pickupLocation}</p>
              <p className="text-muted-foreground">to</p>
              <p className="font-medium" data-testid="text-destination">{destination}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span data-testid="text-datetime">{date} at {time}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm" data-testid="text-passengers">
            {passengers} {passengers === 1 ? "passenger" : "passengers"}
          </span>
        </div>
        {notes && (
          <p className="text-sm text-muted-foreground italic" data-testid="text-notes">
            "{notes}"
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" data-testid="button-offer-ride">
          Offer Ride
        </Button>
      </CardFooter>
    </Card>
  );
}
