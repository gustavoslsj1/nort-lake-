"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Player } from "@/types/jogador";

interface InjuryHealthTabProps {
  player: Player;
}

export function InjuryHealthTab({ player }: InjuryHealthTabProps) {
  const hasInjury = !!player.lesao;

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center",
                hasInjury ? "bg-destructive/20" : "bg-primary/20",
              )}
            >
              {hasInjury ? (
                <AlertTriangle className="h-8 w-8 text-destructive" />
              ) : (
                <ShieldCheck className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-foreground">
                  {hasInjury ? "Jogador Lesionado" : "Jogador Disponível"}
                </h3>
                <Badge
                  className={cn(
                    "border",
                    hasInjury
                      ? "bg-destructive/20 text-destructive border-destructive/30"
                      : "bg-primary/20 text-primary border-primary/30",
                  )}
                >
                  {hasInjury ? "Em recuperação" : "Sem lesão"}
                </Badge>
              </div>
              {hasInjury ? (
                <p className="text-muted-foreground">{player.lesao}</p>
              ) : (
                <p className="text-muted-foreground">
                  Nenhuma lesão registrada. Jogador apto para todas as
                  atividades.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {hasInjury && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Detalhes da Lesão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Lesão</p>
                  <p className="font-semibold text-foreground">
                    {player.lesao}
                  </p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Previsão de Recuperação
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-chart-3" />
                    <p className="font-semibold text-foreground">
                      {player.recuperacao}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                Protocolo de Recuperação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <RecoveryStep
                  step={1}
                  title="Fisioterapia"
                  description="Sessões diárias de fisioterapia para redução do edema"
                  done
                />
                <RecoveryStep
                  step={2}
                  title="Fortalecimento"
                  description="Exercícios de fortalecimento localizado"
                  done={false}
                />
                <RecoveryStep
                  step={3}
                  title="Retorno Gradual"
                  description="Treinos leves com acompanhamento médico"
                  done={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Health overview */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            Resumo de Saúde
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <HealthItem
              label="IMC"
              value={player.imc ? player.imc.toFixed(1) : "0.0"}
              status={player.imc < 25 ? "ok" : "warning"}
            />
            <HealthItem
              label="Gordura Visceral"
              value={`Nível ${player.visceral}`}
              status={player.visceral <= 5 ? "ok" : "warning"}
            />
            <HealthItem
              label="Idade Corporal"
              value={`${player.idadeCorporal} anos`}
              status={player.idadeCorporal <= player.idade ? "ok" : "warning"}
            />
            <HealthItem
              label="GC"
              value={`${player.gc}%`}
              status={player.gc < 20 ? "ok" : "warning"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecoveryStep({
  step,
  title,
  description,
  done,
}: {
  step: number;
  title: string;
  description: string;
  done: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
      <div
        className={cn(
          "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
          done ? "bg-primary/20" : "bg-muted",
        )}
      >
        {done ? (
          <CheckCircle className="h-4 w-4 text-primary" />
        ) : (
          <span className="text-xs font-bold text-muted-foreground">
            {step}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function HealthItem({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "ok" | "warning";
}) {
  return (
    <div className="bg-secondary rounded-lg p-3 text-center">
      <p
        className={cn(
          "text-lg font-bold",
          status === "ok" ? "text-primary" : "text-chart-3",
        )}
      >
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
