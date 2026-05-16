// "use client";

// import { Player, } from "@/types/jogador";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import {
//   CalendarDays,
//   Dumbbell,
//   Trophy,
//   ClipboardCheck,
//   Coffee,
//   Stethoscope,
// } from "lucide-react";

// interface ScheduleTabProps {
//   player: Player;
// }

// // const tipoConfig: Record<
// //   CronogramaItem["tipo"],
// //   { icon: React.ReactNode; color: string; badgeClass: string }
// // > = {
// //   treino: {
// //     icon: <Dumbbell className="h-4 w-4" />,
// //     color: "text-primary",
// //     badgeClass: "bg-primary/20 text-primary border-primary/30",
// //   },
// //   jogo: {
// //     icon: <Trophy className="h-4 w-4" />,
// //     color: "text-chart-3",
// //     badgeClass: "bg-chart-3/20 text-chart-3 border-chart-3/30",
// //   },
// //   avaliacao: {
// //     icon: <ClipboardCheck className="h-4 w-4" />,
// //     color: "text-accent",
// //     badgeClass: "bg-accent/20 text-accent border-accent/30",
// //   },
// //   folga: {
// //     icon: <Coffee className="h-4 w-4" />,
// //     color: "text-muted-foreground",
// //     badgeClass: "bg-muted text-muted-foreground border-muted",
// //   },
// //   fisioterapia: {
// //     icon: <Stethoscope className="h-4 w-4" />,
// //     color: "text-chart-4",
// //     badgeClass: "bg-chart-4/20 text-chart-4 border-chart-4/30",
// //   },
// // };

// export function ScheduleTab({ player }: ScheduleTabProps) {
//   return (
//     <div className="space-y-4">
//       <Card className="border-border bg-card">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-lg flex items-center gap-2">
//             <CalendarDays className="h-5 w-5 text-primary" />
//             Cronograma Semanal
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2">
//             {player.cronograma.map((item, index) => {
//               const config = tipoConfig[item.tipo];
//               return (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
//                 >
//                   <div
//                     className={cn(
//                       "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
//                       `${config.badgeClass.split(" ")[0]}`,
//                     )}
//                   >
//                     <span className={config.color}>{config.icon}</span>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2">
//                       <p className="font-semibold text-foreground text-sm">
//                         {item.dia}
//                       </p>
//                       <Badge
//                         className={cn("border text-xs", config.badgeClass)}
//                       >
//                         {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground truncate">
//                       {item.atividade}
//                     </p>
//                   </div>
//                   <div className="text-right shrink-0">
//                     <p className="text-sm font-medium text-foreground">
//                       {item.horario}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Legend */}
//       <Card className="border-border bg-card">
//         <CardContent className="p-4">
//           <div className="flex flex-wrap gap-4">
//             {Object.entries(tipoConfig).map(([tipo, config]) => (
//               <div key={tipo} className="flex items-center gap-2">
//                 <div
//                   className={cn(
//                     "h-6 w-6 rounded flex items-center justify-center",
//                     config.badgeClass.split(" ")[0],
//                   )}
//                 >
//                   <span className={config.color}>{config.icon}</span>
//                 </div>
//                 <span className="text-xs text-muted-foreground capitalize">
//                   {tipo}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
