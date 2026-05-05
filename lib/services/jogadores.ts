import { createClientBrowser } from "../supabase/client";

export async function Getjogadores() {
  const supabase = await createClientBrowser();
  const { data: jogadores } = await supabase.from("jogador").select();
  return { data: jogadores };
}
