"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { players, attendanceByMonth } from "@/lib/data";
import {
  CalendarIcon,
  Check,
  X,
  TrendingUp,
  TrendingDown,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns/fp/format";
import { ptBR } from "date-fns/locale";

// Dados de presença detalhados por treino
const trainingSchedule = [
  { date: "2024-03-18", type: "Treino Técnico", time: "18:00" },
  { date: "2024-03-20", type: "Treino Físico", time: "18:00" },
  { date: "2024-03-22", type: "Treino Tático", time: "19:00" },
  { date: "2024-03-25", type: "Treino Técnico", time: "18:00" },
  { date: "2024-03-27", type: "Coletivo", time: "18:00" },
];

// Simulação de presença por jogador em treinos recentes
const attendanceRecords = players.map((player) => ({
  ...player,
  recentAttendance: trainingSchedule.map((training) => ({
    date: training.date,
    present: Math.random() > 0.15, // 85% de chance de estar presente
  })),
}));

export default function PresencaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTraining, setSelectedTraining] = useState(trainingSchedule[0]);

  // Calcular estatísticas
  const totalPlayers = players.length;
  const avgAttendance = Math.round(
    players.reduce((acc, p) => acc + p.attendance, 0) / players.length,
  );
  const bestAttendance = players.reduce((max, p) =>
    p.attendance > max.attendance ? p : max,
  );
  const lowestAttendance = players.reduce((min, p) =>
    p.attendance < min.attendance ? p : min,
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Controle de Presença
            </h1>
            <p className="text-muted-foreground">
              Acompanhe a presença dos jogadores em treinos e jogos
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Jogadores
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {totalPlayers}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Presença Média
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {avgAttendance}%
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Maior Presença
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {bestAttendance.name}
                    </p>
                    <p className="text-sm text-primary">
                      {bestAttendance.attendance}%
                    </p>
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-green-500/30">
                    <AvatarFallback className="bg-green-500/10 text-green-500">
                      {bestAttendance.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Menor Presença
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {lowestAttendance.name}
                    </p>
                    <p className="text-sm text-red-500">
                      {lowestAttendance.attendance}%
                    </p>
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-red-500/30">
                    <AvatarFallback className="bg-red-500/10 text-red-500">
                      {lowestAttendance.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chart */}
            <Card className="border-border bg-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Evolução da Presença
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceByMonth}>
                      <defs>
                        <linearGradient
                          id="colorPresenca"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "hsl(var(--muted-foreground))",
                          fontSize: 12,
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "hsl(var(--muted-foreground))",
                          fontSize: 12,
                        }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="presentes"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#colorPresenca)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Calendar & Training Selection */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Selecionar Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-secondary border-border",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {/* {date
                        ? format(date, "PPP", { locale: ptBR })
                        : "Selecione uma data"} */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-border">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Treinos Recentes
                  </p>
                  {trainingSchedule.map((training, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTraining(training)}
                      className={cn(
                        "w-full rounded-lg p-3 text-left transition-all",
                        selectedTraining.date === training.date
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-muted",
                      )}
                    >
                      <p className="font-medium">{training.type}</p>
                      <p className="text-sm opacity-80">
                        {new Date(training.date).toLocaleDateString("pt-BR")} -{" "}
                        {training.time}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance List */}
          <Card className="mt-6 border-border bg-card">
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-foreground">
                  Lista de Presença - {selectedTraining.type}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="w-fit border-primary text-primary"
                >
                  {new Date(selectedTraining.date).toLocaleDateString("pt-BR")}{" "}
                  - {selectedTraining.time}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceRecords.map((player) => {
                  const attendance = player.recentAttendance.find(
                    (a) => a.date === selectedTraining.date,
                  );
                  const isPresent = attendance?.present ?? false;

                  return (
                    <div
                      key={player.id}
                      className="flex items-center justify-between rounded-lg bg-secondary p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {player.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            {player.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {player.position} | Presença geral:{" "}
                            {player.attendance}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full",
                            isPresent ? "bg-green-500/20" : "bg-red-500/20",
                          )}
                        >
                          {isPresent ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isPresent ? "text-green-500" : "text-red-500",
                          )}
                        >
                          {isPresent ? "Presente" : "Ausente"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
