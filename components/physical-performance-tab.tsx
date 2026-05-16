"use client";

import { Player } from "@/types/jogador";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Wind, StretchHorizontal, Dumbbell, Target } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

interface PhysicalPerformanceTabProps {
  player: Player;
}

export function PhysicalPerformanceTab({
  player,
}: PhysicalPerformanceTabProps) {
  const radarData = [
    { metric: "Flexibilidade", value: player.Flexibilidade, fullMark: 100 },
    {
      metric: "Impulsão",
      value: normalizeImpulsao(player.Impulsao),
      fullMark: 100,
    },
    { metric: "VO2 Max", value: normalizeVo2(player.VO2Max), fullMark: 100 },
    { metric: "Força Sup.", value: player.ForcaSuperior, fullMark: 100 },
    {
      metric: "Desemp. Técnico",
      value: player.desempenhoTecnico,
      fullMark: 100,
    },
  ];

  const vo2Category = getVo2Category(player.VO2Max, player.sexo);

  return (
    <div className="space-y-4">
      {/* Top metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<StretchHorizontal className="h-6 w-6 text-primary" />}
          iconBg="bg-primary/20"
          label="Flexibilidade"
          value={`${player.Flexibilidade}`}
          suffix="/100"
        />
        <MetricCard
          icon={<Zap className="h-6 w-6 text-chart-3" />}
          iconBg="bg-chart-3/20"
          label="Impulsão"
          value={`${player.Impulsao}`}
          suffix="cm"
        />
        <MetricCard
          icon={<Wind className="h-6 w-6 text-accent" />}
          iconBg="bg-accent/20"
          label="VO2 Max"
          value={`${player.VO2Max}`}
          suffix="ml/kg/min"
          subtitle={vo2Category}
        />
        <MetricCard
          icon={<Dumbbell className="h-6 w-6 text-chart-4" />}
          iconBg="bg-chart-4/20"
          label="Força Superior"
          value={`${player.ForcaSuperior}`}
          suffix="/100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Radar chart */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Radar de Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 10,
                    }}
                  />
                  <Radar
                    name="Atleta"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Progress bars */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Métricas Detalhadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <ProgressRow
              label="Flexibilidade"
              value={player.Flexibilidade}
              max={100}
              color="bg-primary"
            />
            <ProgressRow
              label="Impulsão Vertical"
              value={player.Impulsao}
              max={100}
              color="bg-chart-3"
              suffix="cm"
            />
            <ProgressRow
              label="VO2 Max"
              value={player.VO2Max}
              max={70}
              color="bg-accent"
              suffix="ml/kg/min"
            />
            <ProgressRow
              label="Força Muscular Superior"
              value={player.ForcaSuperior}
              max={100}
              color="bg-chart-4"
            />
            <ProgressRow
              label="Desempenho Técnico em Jogo"
              value={player.desempenhoTecnico}
              max={100}
              color="bg-chart-1"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  iconBg,
  label,
  value,
  suffix,
  subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  suffix?: string;
  subtitle?: string;
}) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4 flex items-center gap-3">
        <div
          className={`h-11 w-11 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xl font-bold text-foreground truncate">
            {value}
            {suffix && (
              <span className="text-xs font-normal text-muted-foreground ml-1">
                {suffix}
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground truncate">{label}</p>
          {subtitle && (
            <p className="text-xs text-primary mt-0.5">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressRow({
  label,
  value,
  max,
  color,
  suffix,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">
          {value}
          {suffix ? ` ${suffix}` : "/100"}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}

function normalizeImpulsao(cm: number): number {
  return Math.min((cm / 80) * 100, 100);
}

function normalizeVo2(vo2: number): number {
  return Math.min((vo2 / 65) * 100, 100);
}

function getVo2Category(vo2: number, sexo: string): string {
  if (sexo === "Masculino") {
    if (vo2 >= 55) return "Excelente";
    if (vo2 >= 47) return "Bom";
    if (vo2 >= 38) return "Médio";
    return "Abaixo da média";
  } else {
    if (vo2 >= 50) return "Excelente";
    if (vo2 >= 42) return "Bom";
    if (vo2 >= 33) return "Médio";
    return "Abaixo da média";
  }
}
