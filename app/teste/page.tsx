"use client";
import { MyCustomPie, renderCustomizedLabel } from "@/lib/recharts";
import { Getjogadores } from "@/lib/services/jogadores";
import { createClientBrowser } from "@/lib/supabase/client";
import { log } from "console";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

export default function TestePage() {
  const [jogador, setJogador] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      const supabase = await createClientBrowser();
      const { data: jogador, error } = await supabase.from("jogador").select();
      console.log(jogador);
      setJogador(jogador);
    }
    fetchData();
  }, []);
  if (!jogador) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p>Anime não encontrado.</p>
      </div>
    );
  }

  return <p>{jogador?.length} jogadores</p>;
}
