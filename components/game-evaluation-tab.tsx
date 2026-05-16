"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ClipboardList, Star, TrendingUp, MessageSquare } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Player } from "@/types/jogador";

interface GameEvaluationTabProps {
  player: Player;
}

export function GameEvaluationTab({ player }: GameEvaluationTabProps) {
  //   const avgNota =
  //     player.avaliacoes.length > 0
  //       ? player.avaliacoes.reduce((sum, a) => sum + a.nota, 0) /
  //         player.avaliacoes.length
  //       : 0;

  //   const chartData = player.avaliacoes.map((a) => ({
  //     jogo: `vs ${a.adversario}`,
  //     nota: a.nota,
  //   }));

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {/* {avgNota.toFixed(1)} */}
              </p>
              <p className="text-sm text-muted-foreground">Nota Média</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-chart-3/20 flex items-center justify-center">
              <ClipboardList className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {/* {player.avaliacoes.length} */}
              </p>
              <p className="text-sm text-muted-foreground">Jogos Avaliados</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {player.desempenhoTecnico}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  /100
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Desempenho Técnico
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chart */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Notas por Jogo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="jogo"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                  />
                  <YAxis
                    domain={[0, 10]}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar
                    dataKey="nota"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div> */}
          </CardContent>
        </Card>

        {/* Evaluation list */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Avaliações Detalhadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="space-y-3">
              {player.avaliacoes.map((avaliacao, index) => (
                <div key={index} className="p-3 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        vs {avaliacao.adversario}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {avaliacao.data}
                      </span>
                    </div>
                    <Badge
                      className={cn(
                        "border",
                        avaliacao.nota >= 8
                          ? "bg-primary/20 text-primary border-primary/30"
                          : avaliacao.nota >= 6
                            ? "bg-chart-3/20 text-chart-3 border-chart-3/30"
                            : "bg-destructive/20 text-destructive border-destructive/30",
                      )}
                    >
                      {avaliacao.nota.toFixed(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {avaliacao.observacoes}
                  </p>
                </div>
              ))}
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
