"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import { PlayerProfileHeader } from "@/components/profile-header";
import { BodyCompositionTab } from "@/components/body-composition-tab";
import { PhysicalPerformanceTab } from "@/components/physical-performance-tab";
import { GameEvaluationTab } from "@/components/game-evaluation-tab";
import { InjuryHealthTab } from "@/components/injury-health-tab";
// import { ScheduleTab } from "@/components/schedule-tab";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Activity,
  Dumbbell,
  ClipboardList,
  HeartPulse,
  CalendarDays,
  Users,
} from "lucide-react";
import { createClientBrowser } from "@/lib/supabase/client";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/types/jogador";
export default function PlayerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [jogador, setJogador] = useState<Player[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      const supabase = await createClientBrowser();
      const { data: jogador } = await supabase.from("jogador").select();
      console.log(" esta aqui o jogador ", jogador);

      setJogador(jogador);
    }
    fetchData();
  }, []);
  const { id } = use(params);
  const player = jogador?.find((p) => p.id === parseInt(id));

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:pl-64">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <ArrowLeft className="h-5 w-5" />

            <h1 className="text-2xl font-bold text-foreground">
              Detalhes do Jogador
            </h1>
          </div>

          {/* Player Profile Card */}
          <PlayerProfileHeader player={player} />

          {/* Tabs */}
          <Tabs defaultValue="composicao" className="space-y-4">
            <TabsList className="bg-secondary border border-border flex-wrap h-auto gap-1 p-1">
              <TabsTrigger
                value="composicao"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
              >
                <Activity className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
                Composição
              </TabsTrigger>
              <TabsTrigger
                value="desempenho"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
              >
                <Dumbbell className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
                Desempenho
              </TabsTrigger>
              <TabsTrigger
                value="avaliacao"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
              >
                <ClipboardList className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
                Avaliação
              </TabsTrigger>
              <TabsTrigger
                value="saude"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
              >
                <HeartPulse className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
                Saúde
              </TabsTrigger>
              <TabsTrigger
                value="cronograma"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
              >
                <CalendarDays className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
                Cronograma
              </TabsTrigger>
            </TabsList>

            <TabsContent value="composicao">
              <BodyCompositionTab player={player} />
            </TabsContent>

            <TabsContent value="desempenho">
              <PhysicalPerformanceTab player={player} />
            </TabsContent>

            <TabsContent value="avaliacao">
              <GameEvaluationTab player={player} />
            </TabsContent>

            <TabsContent value="saude">
              <InjuryHealthTab player={player} />
            </TabsContent>

            {/* <TabsContent value="cronograma">
              <ScheduleTab player={player} />
            </TabsContent> */}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
