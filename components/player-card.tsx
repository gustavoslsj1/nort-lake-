import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    position: string;
    number: number;
    avatar: string;
    stats: {
      points: number;
      assists: number;
      rebounds: number;
      steals: number;
      blocks: number;
    };
    health: {
      status: string;
      lastCheckup: string;
      notes: string;
    };
    attendance: number;
    gamesPlayed: number;
  };
  rank?: number;
  showDetails?: boolean;
}

export function PlayerCard({
  player,
  rank,
  showDetails = false,
}: PlayerCardProps) {
  const healthStatusColor = {
    Saudável: "bg-green-500/20 text-green-500",
    Lesionado: "bg-red-500/20 text-red-500",
    "Em observação": "bg-yellow-500/20 text-yellow-500",
  };

  return (
    <Card className="border-border bg-card transition-all duration-200 hover:border-primary/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {rank && (
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                rank === 1
                  ? "bg-primary text-primary-foreground"
                  : rank === 2
                    ? "bg-muted text-foreground"
                    : rank === 3
                      ? "bg-amber-600/20 text-amber-500"
                      : "bg-secondary text-muted-foreground",
              )}
            >
              {rank}
            </div>
          )}
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {player.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground truncate">
                {player.name}
              </p>
              <span className="text-sm text-muted-foreground">
                #{player.number}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{player.position}</p>
          </div>
          <Badge
            className={cn(
              "shrink-0",
              healthStatusColor[
                player.health.status as keyof typeof healthStatusColor
              ] || "bg-muted text-muted-foreground",
            )}
          >
            {player.health.status}
          </Badge>
        </div>

        {showDetails && (
          <div className="mt-4 grid grid-cols-5 gap-2 rounded-lg bg-secondary p-3">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">
                {player.stats.points}
              </p>
              <p className="text-xs text-muted-foreground">PTS</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {player.stats.assists}
              </p>
              <p className="text-xs text-muted-foreground">AST</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {player.stats.rebounds}
              </p>
              <p className="text-xs text-muted-foreground">REB</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {player.stats.steals}
              </p>
              <p className="text-xs text-muted-foreground">STL</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {player.stats.blocks}
              </p>
              <p className="text-xs text-muted-foreground">BLK</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
