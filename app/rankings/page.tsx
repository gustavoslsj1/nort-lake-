"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { players } from "@/lib/data";
import {
  Trophy,
  Medal,
  Award,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

type StatKey = "points" | "assists" | "rebounds" | "steals" | "blocks";

export default function RankingsPage() {
  const [selectedStat, setSelectedStat] = useState<StatKey>("points");

  const statLabels: Record<StatKey, string> = {
    points: "Pontos",
    assists: "Assistências",
    rebounds: "Rebotes",
    steals: "Roubos de Bola",
    blocks: "Tocos",
  };

  const sortedByPoints = [...players].sort(
    (a, b) => b.stats.points - a.stats.points,
  );
  const sortedByAssists = [...players].sort(
    (a, b) => b.stats.assists - a.stats.assists,
  );
  const sortedByRebounds = [...players].sort(
    (a, b) => b.stats.rebounds - a.stats.rebounds,
  );
  const sortedBySteals = [...players].sort(
    (a, b) => b.stats.steals - a.stats.steals,
  );
  const sortedByBlocks = [...players].sort(
    (a, b) => b.stats.blocks - a.stats.blocks,
  );

  const getRankingByStat = (stat: StatKey) => {
    return [...players].sort((a, b) => b.stats[stat] - a.stats[stat]);
  };

  const getChartData = (stat: StatKey) => {
    return getRankingByStat(stat)
      .slice(0, 5)
      .map((player) => ({
        name: player.name.split(" ")[0],
        value: player.stats[stat],
        fullName: player.name,
      }));
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const topPerformers = [
    {
      title: "Maior Pontuador",
      player: sortedByPoints[0],
      stat: "points",
      value: sortedByPoints[0].stats.points,
      unit: "pts",
    },
    {
      title: "Mais Assistências",
      player: sortedByAssists[0],
      stat: "assists",
      value: sortedByAssists[0].stats.assists,
      unit: "ast",
    },
    {
      title: "Mais Rebotes",
      player: sortedByRebounds[0],
      stat: "rebounds",
      value: sortedByRebounds[0].stats.rebounds,
      unit: "reb",
    },
    {
      title: "Mais Roubos",
      player: sortedBySteals[0],
      stat: "steals",
      value: sortedBySteals[0].stats.steals,
      unit: "stl",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Rankings</h1>
            <p className="text-muted-foreground">
              Classificação automática dos jogadores por estatísticas
            </p>
          </div>

          {/* Top Performers */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topPerformers.map((item, index) => (
              <Card
                key={index}
                className="border-border bg-card overflow-hidden"
              >
                <div className="h-1 bg-primary" />
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                        {item.player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <p className="text-xs text-muted-foreground">
                          {item.title}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        {item.player.name}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {item.value}{" "}
                        <span className="text-sm text-muted-foreground">
                          {item.unit}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Rankings */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Detailed Rankings */}
            <Card className="border-border bg-card lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Ranking por Estatística
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={selectedStat}
                  onValueChange={(v) => setSelectedStat(v as StatKey)}
                >
                  <TabsList className="grid w-full grid-cols-5 bg-secondary mb-6">
                    <TabsTrigger
                      value="points"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      PTS
                    </TabsTrigger>
                    <TabsTrigger
                      value="assists"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      AST
                    </TabsTrigger>
                    <TabsTrigger
                      value="rebounds"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      REB
                    </TabsTrigger>
                    <TabsTrigger
                      value="steals"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      STL
                    </TabsTrigger>
                    <TabsTrigger
                      value="blocks"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      BLK
                    </TabsTrigger>
                  </TabsList>

                  {(
                    [
                      "points",
                      "assists",
                      "rebounds",
                      "steals",
                      "blocks",
                    ] as StatKey[]
                  ).map((stat) => (
                    <TabsContent key={stat} value={stat} className="space-y-3">
                      <div className="mb-4 text-lg font-semibold text-foreground">
                        {statLabels[stat]}
                      </div>
                      {getRankingByStat(stat).map((player, index) => (
                        <div
                          key={player.id}
                          className={cn(
                            "flex items-center gap-4 rounded-lg p-4 transition-all",
                            index === 0
                              ? "bg-primary/10 border border-primary/20"
                              : index < 3
                                ? "bg-secondary"
                                : "bg-secondary/50",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold",
                              index === 0
                                ? "bg-primary text-primary-foreground"
                                : index === 1
                                  ? "bg-gray-400 text-white"
                                  : index === 2
                                    ? "bg-amber-600 text-white"
                                    : "bg-muted text-muted-foreground",
                            )}
                          >
                            {index < 3 ? getRankIcon(index + 1) : index + 1}
                          </div>
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {player.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">
                              {player.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {player.position}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {player.stats[stat]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              por jogo
                            </p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Top 5 - {statLabels[selectedStat]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getChartData(selectedStat)}
                      layout="vertical"
                      margin={{ left: 0, right: 20 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "hsl(var(--muted-foreground))",
                          fontSize: 12,
                        }}
                        width={60}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))",
                        }}
                        formatter={(value: any) => {
                          if (typeof value !== "number") return null;
                          return `${value} por jogo`;
                        }}
                        labelFormatter={(label: any) => {
                          const entry = getChartData(selectedStat).find(
                            (item) => item.name === label,
                          );
                          return entry?.fullName || label;
                        }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[0, 4, 4, 0]}
                        maxBarSize={35}
                      >
                        {getChartData(selectedStat).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? "hsl(var(--primary))"
                                : index === 1
                                  ? "hsl(var(--chart-2))"
                                  : index === 2
                                    ? "hsl(var(--chart-3))"
                                    : "hsl(var(--muted))"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MVP Section */}
          <Card className="mt-6 border-border bg-card overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-yellow-500 to-primary" />
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                MVP da Temporada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-primary">
                    <AvatarFallback className="bg-primary/10 text-primary text-4xl font-bold">
                      {sortedByPoints[0].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <Badge className="mb-2 bg-primary/20 text-primary border-primary/30">
                    MVP 2024
                  </Badge>
                  <h3 className="text-2xl font-bold text-foreground">
                    {sortedByPoints[0].name}
                  </h3>
                  <p className="text-muted-foreground">
                    {sortedByPoints[0].position} | #{sortedByPoints[0].number}
                  </p>
                  <div className="mt-4 grid grid-cols-5 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        {sortedByPoints[0].stats.points}
                      </p>
                      <p className="text-xs text-muted-foreground">PTS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {sortedByPoints[0].stats.assists}
                      </p>
                      <p className="text-xs text-muted-foreground">AST</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {sortedByPoints[0].stats.rebounds}
                      </p>
                      <p className="text-xs text-muted-foreground">REB</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {sortedByPoints[0].stats.steals}
                      </p>
                      <p className="text-xs text-muted-foreground">STL</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {sortedByPoints[0].stats.blocks}
                      </p>
                      <p className="text-xs text-muted-foreground">BLK</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
