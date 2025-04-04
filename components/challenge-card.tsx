import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FlameIcon as Fire, Users } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  category: string;
  xp: number;
  participants: number;
  deadline: string;
  description: string;
}

export function ChallengeCard({
  title,
  category,
  xp,
  participants,
  deadline,
  description,
}: ChallengeCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{category}</Badge>
          <Badge variant="secondary" className="flex gap-1 items-center">
            <Fire className="h-3 w-3 text-orange-500" />
            <span>{xp} XP</span>
          </Badge>
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {participants} participants
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {deadline} remaining
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="bg-muted/30 pt-2">
        <Button className="w-full">Join Challenge</Button>
      </CardFooter>
    </Card>
  );
}
