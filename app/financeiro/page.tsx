"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { players } from "@/lib/data";
import { Search, Activity, Heart, Calendar, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function JogadoresPage() {
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [healthFilter, setHealthFilter] = useState("all");
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPosition =
      positionFilter === "all" || player.position === positionFilter;
    const matchesHealth =
      healthFilter === "all" || player.health.status === healthFilter;
    return matchesSearch && matchesPosition && matchesHealth;
  });

  const positions = [...new Set(players.map((p) => p.position))];
  const healthStatuses = [...new Set(players.map((p) => p.health.status))];

  const togglePlayerSelection = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    } else if (selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const getComparisonData = () => {
    if (selectedPlayers.length !== 2) return [];
    const player1 = players.find((p) => p.id === selectedPlayers[0]);
    const player2 = players.find((p) => p.id === selectedPlayers[1]);
    if (!player1 || !player2) return [];

    return [
      {
        stat: "Pontos",
        [player1.name]: player1.stats.points,
        [player2.name]: player2.stats.points,
        fullMark: 30,
      },
      {
        stat: "Assistências",
        [player1.name]: player1.stats.assists,
        [player2.name]: player2.stats.assists,
        fullMark: 15,
      },
      {
        stat: "Rebotes",
        [player1.name]: player1.stats.rebounds,
        [player2.name]: player2.stats.rebounds,
        fullMark: 15,
      },
      {
        stat: "Roubos",
        [player1.name]: player1.stats.steals,
        [player2.name]: player2.stats.steals,
        fullMark: 5,
      },
      {
        stat: "Tocos",
        [player1.name]: player1.stats.blocks,
        [player2.name]: player2.stats.blocks,
        fullMark: 5,
      },
    ];
  };

  const healthStatusColor = {
    Saudável: "bg-green-500/20 text-green-500 border-green-500/30",
    Lesionado: "bg-red-500/20 text-red-500 border-red-500/30",
    "Em observação": "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Jogadores</h1>
              <p className="text-muted-foreground">
                Gerencie estatísticas, saúde e desempenho dos jogadores
              </p>
            </div>
            {selectedPlayers.length === 2 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Comparar Jogadores
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Comparação de Jogadores
                    </DialogTitle>
                  </DialogHeader>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={getComparisonData()}>
                        <PolarGrid stroke="hsl(var(--border))" />
                        <PolarAngleAxis
                          dataKey="stat"
                          tick={{
                            fill: "hsl(var(--muted-foreground))",
                            fontSize: 12,
                          }}
                        />
                        <PolarRadiusAxis
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        {selectedPlayers.map((playerId, index) => {
                          const player = players.find((p) => p.id === playerId);
                          return (
                            <Radar
                              key={playerId}
                              name={player?.name}
                              dataKey={player?.name || ""}
                              stroke={
                                index === 0 ? "hsl(var(--primary))" : "#22c55e"
                              }
                              fill={
                                index === 0 ? "hsl(var(--primary))" : "#22c55e"
                              }
                              fillOpacity={0.3}
                            />
                          );
                        })}
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Filters */}
          <Card className="mb-6 border-border bg-card">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar jogador..."
                    className="bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select
                  value={positionFilter}
                  onValueChange={setPositionFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Posição" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Todas Posições</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={healthFilter} onValueChange={setHealthFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Todos Status</SelectItem>
                    {healthStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedPlayers.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Selecionados para comparação:
                  </span>
                  {selectedPlayers.map((id) => {
                    const player = players.find((p) => p.id === id);
                    return (
                      <Badge
                        key={id}
                        variant="outline"
                        className="border-primary bg-primary/10 text-primary"
                      >
                        {player?.name}
                      </Badge>
                    );
                  })}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPlayers([])}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Limpar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Players Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPlayers.map((player) => (
              <Card
                key={player.id}
                className={cn(
                  "border-border bg-card cursor-pointer transition-all duration-200",
                  selectedPlayers.includes(player.id)
                    ? "border-primary ring-2 ring-primary/20"
                    : "hover:border-primary/50",
                )}
                onClick={() => togglePlayerSelection(player.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-foreground">
                          {player.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {player.position} | #{player.number}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        "border",
                        healthStatusColor[
                          player.health.status as keyof typeof healthStatusColor
                        ],
                      )}
                    >
                      {player.health.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-5 gap-2 rounded-lg bg-secondary p-3">
                    <div className="text-center">
                      <p className="text-xl font-bold text-primary">
                        {player.stats.points}
                      </p>
                      <p className="text-xs text-muted-foreground">PTS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">
                        {player.stats.assists}
                      </p>
                      <p className="text-xs text-muted-foreground">AST</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">
                        {player.stats.rebounds}
                      </p>
                      <p className="text-xs text-muted-foreground">REB</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">
                        {player.stats.steals}
                      </p>
                      <p className="text-xs text-muted-foreground">STL</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">
                        {player.stats.blocks}
                      </p>
                      <p className="text-xs text-muted-foreground">BLK</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Presença:</span>
                      <span className="font-medium text-foreground">
                        {player.attendance}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Jogos:</span>
                      <span className="font-medium text-foreground">
                        {player.gamesPlayed}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        Último checkup:
                      </span>
                      <span className="font-medium text-foreground">
                        {new Date(player.health.lastCheckup).toLocaleDateString(
                          "pt-BR",
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground truncate">
                        {player.health.notes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
