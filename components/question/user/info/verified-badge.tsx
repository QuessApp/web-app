import { Verified } from "lucide-react"

interface VerifiedBadgeProps {
  isVerified: boolean
}

export const VerifiedBadge = ({ isVerified }: VerifiedBadgeProps) => {
  return isVerified ? (
    <Verified className="ml-1 h-[17px] w-[17px] text-purple-600" />
  ) : null
}
