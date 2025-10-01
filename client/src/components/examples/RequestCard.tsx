import { RequestCard } from '../RequestCard'

export default function RequestCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <RequestCard
        id="1"
        userName="Sarah Johnson"
        isVerified={true}
        rating={4.8}
        pickupLocation="Main Campus Library"
        destination="Downtown Shopping Mall"
        date="Oct 5"
        time="2:30 PM"
        passengers={2}
        notes="Prefer non-smoking drivers"
      />
    </div>
  )
}
