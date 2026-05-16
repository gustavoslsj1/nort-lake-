"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Player } from "@/types/jogador";
import {
  Activity,
  Heart,
  Scale,
  Flame,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface BodyCompositionTabProps {
  player: Player;
}

export function BodyCompositionTab({ player }: BodyCompositionTabProps) {
  const imcCategory = getImcCategory(player.imc);
  const visceralCategory = getVisceralCategory(player.visceral);

  const bodyCompositionData = [
    { name: "Músculo", value: player.musculo, fill: "hsl(var(--primary))" },
    { name: "Gordura", value: player.gc, fill: "hsl(var(--chart-4))" },
    {
      name: "Outros",
      value: 100 - player.musculo - player.gc,
      fill: "hsl(var(--muted))",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          icon={<Scale className="h-6 w-6 text-primary" />}
          iconBg="bg-primary/20"
          label="IMC"
          value={player.imc ? player.imc.toFixed(1) : "0.0"}
          subtitle={imcCategory}
        />
        <MetricCard
          icon={<Flame className="h-6 w-6 text-chart-4" />}
          iconBg="bg-chart-4/20"
          label="Taxa Metabólica Basal"
          value={`${player.basal}`}
          suffix="kcal"
        />
        <MetricCard
          icon={<Heart className="h-6 w-6 text-destructive" />}
          iconBg="bg-destructive/20"
          label="Idade Corporal"
          value={`${player.idadeCorporal}`}
          suffix="anos"
          subtitle={
            player.idadeCorporal < player.idade
              ? "Abaixo da real"
              : player.idadeCorporal === player.idade
                ? "Igual à real"
                : "Acima da real"
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Body Composition Pie */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Composição Corporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bodyCompositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {bodyCompositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value) => [
                      typeof value === "number" ? `${value.toFixed(1)}%` : "",
                      "",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {bodyCompositionData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  {/* <span className="text-muted-foreground">
                    {item.name}: {item.value!.toFixed(1)}%
                  </span> */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detail metrics */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Detalhes Corporais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <DetailRow label="Peso" value={`${player.peso} kg`} />
            <DetailRow
              label="Gordura Corporal (GC)"
              value={`${player.gc}%`}
              progress={player.gc}
              max={35}
            />
            <DetailRow
              label="Massa Muscular"
              value={`${player.musculo}%`}
              progress={player.musculo}
              max={60}
            />
            <DetailRow
              label="Gordura Visceral"
              value={`Nível ${player.visceral}`}
              subtitle={visceralCategory}
            />
            <DetailRow
              label="Idade Corporal"
              value={`${player.idadeCorporal} anos`}
              subtitle={`Idade real: ${player.idade} anos`}
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
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`h-12 w-12 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">
            {value}
            {suffix && (
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {suffix}
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
          {subtitle && (
            <p className="text-xs text-primary mt-0.5">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({
  label,
  value,
  progress,
  max,
  subtitle,
}: {
  label: string;
  value: string;
  progress?: number;
  max?: number;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value}</span>
      </div>
      {progress !== undefined && max && (
        <Progress value={(progress / max) * 100} className="h-2" />
      )}
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
}

function getImcCategory(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obeso";
}

function getVisceralCategory(level: number): string {
  if (level <= 5) return "Saudável";
  if (level <= 10) return "Moderado";
  return "Alto";
}
