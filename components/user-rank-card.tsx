import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserRankCardProps {
  rank: number;
  username: string;
  level: number;
  xp: number;
  avatar: string;
}

export function UserRankCard({
  rank,
  username,
  level,
  xp,
  avatar,
}: UserRankCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-semibold">
          {rank}
        </div>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{username}</p>
          <p className="text-xs text-muted-foreground">Level {level}</p>
        </div>
      </div>
      <Badge variant="secondary" className="ml-auto">
        {xp} XP
      </Badge>
    </div>
  );
}
