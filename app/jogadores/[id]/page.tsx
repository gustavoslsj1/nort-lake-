"use client";

import { use } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { players } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Activity,
  DollarSign,
  Calendar,
  AlertTriangle,
  Lightbulb,
  StickyNote,
  TrendingUp,
  Heart,
  Footprints,
  Target,
  Timer,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const player = players.find((p) => p.id === parseInt(id));

  if (!player) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Jogador não encontrado
            </h1>
            <Link href="/jogadores">
              <Button variant="outline">Voltar para Jogadores</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const healthStatusColor = {
    Saudável: "bg-green-500/20 text-green-500 border-green-500/30",
    Lesionado: "bg-red-500/20 text-red-500 border-red-500/30",
    "Em observação": "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  };

  const priorityColor = {
    Alta: "bg-red-500/20 text-red-500",
    Média: "bg-yellow-500/20 text-yellow-500",
    Baixa: "bg-green-500/20 text-green-500",
  };

  const paymentStatusColor = {
    Pago: "bg-green-500/20 text-green-500",
    Pendente: "bg-yellow-500/20 text-yellow-500",
    Atrasado: "bg-red-500/20 text-red-500",
  };

  const kmData = player.training.kmPerSession.map((km, i) => ({
    treino: `T${i + 1}`,
    km,
  }));

  const statsRadialData = [
    {
      name: "PTS",
      value: (player.stats.points / 30) * 100,
      fill: "hsl(var(--primary))",
    },
    {
      name: "AST",
      value: (player.stats.assists / 10) * 100,
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "REB",
      value: (player.stats.rebounds / 15) * 100,
      fill: "hsl(var(--chart-3))",
    },
  ];

  const shootingData = [
    { name: "Lance Livre", value: player.stats.freeThrow },
    { name: "3 Pontos", value: player.stats.threePoint },
    { name: "Field Goal", value: player.stats.fieldGoal },
  ];

  const attendanceChartData = player.attendanceHistory.map((item) => ({
    month: item.month,
    presente: item.present,
    ausente: item.absent,
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/jogadores">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              Detalhes do Jogador
            </h1>
          </div>

          {/* Player Profile Card */}
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
                      <span className="text-xl text-primary font-bold">
                        #{player.number}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      {player.position}
                    </p>
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
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-primary">
                      {player.age}
                    </p>
                    <p className="text-xs text-muted-foreground">Anos</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {player.height}
                    </p>
                    <p className="text-xs text-muted-foreground">Altura</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {player.weight}kg
                    </p>
                    <p className="text-xs text-muted-foreground">Peso</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {player.gamesPlayed}
                    </p>
                    <p className="text-xs text-muted-foreground">Jogos</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {player.description}
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="stats" className="space-y-4">
            <TabsList className="bg-secondary border border-border">
              <TabsTrigger
                value="stats"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Estatísticas
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Treinos
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Presença
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Financeiro
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Saúde
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Notas
              </TabsTrigger>
            </TabsList>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Estatísticas por Jogo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-primary">
                          {player.stats.points}
                        </p>
                        <p className="text-xs text-muted-foreground">PTS</p>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {player.stats.assists}
                        </p>
                        <p className="text-xs text-muted-foreground">AST</p>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {player.stats.rebounds}
                        </p>
                        <p className="text-xs text-muted-foreground">REB</p>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {player.stats.steals}
                        </p>
                        <p className="text-xs text-muted-foreground">STL</p>
                      </div>
                      <div className="bg-secondary rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {player.stats.blocks}
                        </p>
                        <p className="text-xs text-muted-foreground">BLK</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Porcentagens de Arremesso
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {shootingData.map((item) => (
                        <div key={item.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-muted-foreground">
                              {item.name}
                            </span>
                            <span className="text-sm font-bold text-foreground">
                              {item.value}%
                            </span>
                          </div>
                          <Progress value={item.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Errors Section */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Erros de Jogo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {player.errors.map((error, index) => (
                      <div key={index} className="bg-secondary rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-foreground">
                            {error.type}
                          </span>
                          <Badge variant="destructive">{error.count}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {error.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training Tab */}
            <TabsContent value="training" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Footprints className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {player.training.avgKm} km
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Média por Treino
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Timer className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {player.training.sessionsThisMonth}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Treinos este Mês
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {player.training.totalSessions}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total de Treinos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Footprints className="h-5 w-5 text-primary" />
                    Quilômetros por Treino
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={kmData}>
                        <defs>
                          <linearGradient
                            id="kmGradient"
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
                          dataKey="treino"
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="km"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fill="url(#kmGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Taxa de Presença
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-6">
                    <div className="relative">
                      <div className="h-40 w-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            innerRadius="70%"
                            outerRadius="100%"
                            data={[
                              {
                                value: player.attendance,
                                fill: "hsl(var(--primary))",
                              },
                            ]}
                            startAngle={90}
                            endAngle={-270}
                          >
                            <RadialBar
                              background
                              dataKey="value"
                              cornerRadius={10}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">
                          {player.attendance}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Histórico por Mês
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={attendanceChartData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="hsl(var(--border))"
                          />
                          <XAxis
                            dataKey="month"
                            stroke="hsl(var(--muted-foreground))"
                          />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar
                            dataKey="presente"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="ausente"
                            fill="hsl(var(--muted))"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-500">
                        R$ {player.financial.totalPaid.toLocaleString("pt-BR")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Pago
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-500">
                        R${" "}
                        {player.financial.pendingAmount.toLocaleString("pt-BR")}
                      </p>
                      <p className="text-sm text-muted-foreground">Pendente</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Histórico de Pagamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {player.financial.paymentHistory.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {payment.status === "Pago" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : payment.status === "Pendente" ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <div>
                            <p className="font-medium text-foreground">
                              {payment.month}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {payment.date !== "-"
                                ? `Pago em ${payment.date}`
                                : "Aguardando pagamento"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-foreground">
                            R$ {payment.amount.toLocaleString("pt-BR")}
                          </span>
                          <Badge
                            className={
                              paymentStatusColor[
                                payment.status as keyof typeof paymentStatusColor
                              ]
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Tab */}
            <TabsContent value="health" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {player.health.heartRate} bpm
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Freq. Cardíaca
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {player.health.weight} kg
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Peso Atual
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {player.health.bodyFat}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Gordura Corporal
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Status de Saúde
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Badge
                          className={cn(
                            "border",
                            healthStatusColor[
                              player.health
                                .status as keyof typeof healthStatusColor
                            ],
                          )}
                        >
                          {player.health.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Último check-up: {player.health.lastCheckup}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {player.health.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Advice Section */}
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Conselhos para Melhorar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {player.advice.map((tip, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-secondary rounded-lg"
                        >
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes Section */}
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <StickyNote className="h-5 w-5 text-primary" />
                      Notas e Lembretes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {player.notes.map((note, index) => (
                        <div
                          key={index}
                          className="p-3 bg-secondary rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">
                              {note.date}
                            </span>
                            <Badge
                              className={
                                priorityColor[
                                  note.priority as keyof typeof priorityColor
                                ]
                              }
                            >
                              {note.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
