"use client";

import { Sidebar } from "@/components/sidebar";
import { StatCard } from "@/components/start-card";
import { PlayerCard } from "@/components/player-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  players,
  upcomingGames,
  recentResults,
  attendanceByMonth,
} from "@/lib/data";
import {
  Users,
  Target,
  Calendar,
  Trophy,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
} from "recharts";
import { MyCustomPie, renderCustomizedLabel } from "@/lib/recharts";
// import { RechartsDevtools } from "@recharts/devtools";
export default function Dashboard({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  // Calcular ranking por pontos
  const topScorers = [...players]
    .sort((a, b) => b.stats.points - a.stats.points)
    .slice(0, 5);

  // Estatísticas gerais
  const avgPoints = (
    players.reduce((acc, p) => acc + p.stats.points, 0) / players.length
  ).toFixed(1);
  const avgAttendance = Math.round(
    players.reduce((acc, p) => acc + p.attendance, 0) / players.length,
  );
  const healthyPlayers = players.filter(
    (p) => p.health.status === "Saudável",
  ).length;

  const data = [
    { id: 1, nome: "gustavo", value: 10 },
    { id: 2, nome: "gabriel", value: 20 },
    { id: 3, nome: "gugu", value: 30 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do desempenho do time
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total de Jogadores"
              value={players.length}
              subtitle={`${healthyPlayers} saudáveis`}
              icon={Users}
            />
            <StatCard
              title="Média de Pontos"
              value={avgPoints}
              subtitle="por jogo"
              icon={Target}
              trend={{ value: 8.2, positive: true }}
            />
            <StatCard
              title="Presença Média"
              value={`${avgAttendance}%`}
              subtitle="últimos 30 dias"
              icon={Calendar}
            />
            <StatCard
              title="Vitórias/Derrotas"
              value="14/8"
              subtitle="Temporada 2024"
              icon={Trophy}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Performance Chart */}
            <Card className="border-border bg-card lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">
                  Presença Mensal
                </CardTitle>
                <Link
                  href="/presenca"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Ver detalhes <ArrowRight className="h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceByMonth} barGap={8}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#9CA3AF", // cinza (Tailwind: text-gray-400)
                          fontSize: 12,
                        }}
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#9CA3AF",
                          fontSize: 12,
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937", // dark (gray-800)
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />

                      <Bar
                        dataKey="presentes"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                      >
                        {attendanceByMonth.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.presentes >= 90
                                ? "#f97316" // laranja (Tailwind orange-500)
                                : entry.presentes >= 80
                                  ? "#fb923c" // orange-400
                                  : "#374151" // cinza escuro
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Scorers */}
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">
                  Top Pontuadores
                </CardTitle>
                <Link
                  href="/rankings"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Ver ranking <ArrowRight className="h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {topScorers.map((player, index) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    rank={index + 1}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bottom Grid */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Upcoming Games */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Próximos Jogos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingGames.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-secondary p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">
                          {game.date}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {game.time}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {game.opponent}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {game.location}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        game.location === "Casa"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {game.location}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Results */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Resultados Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentResults.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-secondary p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          game.result === "V"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {game.result === "V" ? (
                          <TrendingUp className="h-5 w-5" />
                        ) : (
                          <TrendingDown className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {game.opponent}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {game.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        {game.score}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          game.result === "V"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {game.result === "V" ? "Vitória" : "Derrota"}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Resultados Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PieChart
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "80vh",
                    aspectRatio: 1,
                  }}
                  responsive
                >
                  <Pie
                    data={data}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={isAnimationActive}
                    shape={MyCustomPie}
                  />
                </PieChart>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Resultados Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4"></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Resultados Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4"></CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
