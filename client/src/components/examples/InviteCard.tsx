import { InviteCard } from '../InviteCard'

export default function InviteCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <InviteCard
        id="1"
        userName="Mike Chen"
        isVerified={true}
        rating={4.9}
        pickupLocation="North Campus Dorms"
        destination="City Center Station"
        date="Oct 6"
        time="8:00 AM"
        availableSeats={3}
        notes="Leaving right after morning class"
      />
    </div>
  )
}
