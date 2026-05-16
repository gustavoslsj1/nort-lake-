"use client";

import { Player } from "@/types/jogador";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PlayerProfileHeaderProps {
  player: Player;
}

export function PlayerProfileHeader({ player }: PlayerProfileHeaderProps) {
  const hasInjury = !!player.lesao;

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-primary/30">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                {player.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-foreground">
                  {player.name}
                </h2>
                <Badge
                  className={cn(
                    "border",
                    hasInjury
                      ? "bg-destructive/20 text-destructive border-destructive/30"
                      : "bg-primary/20 text-primary border-primary/30",
                  )}
                >
                  {hasInjury ? "Lesionado" : "Disponível"}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-1">{player.posicao}</p>
              <p className="text-sm text-muted-foreground">
                {player.sexo} &middot; {player.idade} anos
              </p>
              {player.lesao && (
                <p className="text-sm text-destructive mt-1">
                  {player.lesao} &mdash; Recuperação: {player.recuperacao}
                </p>
              )}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatBox
              label="Idade"
              value={`${player.idade}`}
              suffix="anos"
              accent
            />
            <StatBox label="Altura" value={`${player.altura}`} suffix="cm" />
            <StatBox label="Peso" value={`${player.peso}`} suffix="kg" />
            <StatBox label="Posição" value={player.posicao} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatBox({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-secondary rounded-lg p-3 text-center">
      <p
        className={cn(
          "text-2xl font-bold",
          accent ? "text-primary" : "text-foreground",
        )}
      >
        {value}
        {suffix && (
          <span className="text-sm font-normal text-muted-foreground ml-1">
            {suffix}
          </span>
        )}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
