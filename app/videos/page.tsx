"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { videos } from "@/lib/data";
import {
  Search,
  Play,
  ExternalLink,
  Calendar,
  Filter,
  Plus,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function VideosPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null,
  );

  const categories = [...new Set(videos.map((v) => v.category))];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(search.toLowerCase()) ||
      video.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || video.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categoryColors: Record<string, string> = {
    Ofensiva: "bg-primary/20 text-primary border-primary/30",
    Defensiva: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    Transição: "bg-green-500/20 text-green-500 border-green-500/30",
    Fundamentos: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Vídeos e Jogadas
              </h1>
              <p className="text-muted-foreground">
                Biblioteca de vídeos de treinos, jogadas e fundamentos
              </p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Vídeo
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total de Vídeos
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {videos.length}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {categories.slice(0, 3).map((category) => {
              const count = videos.filter(
                (v) => v.category === category,
              ).length;
              return (
                <Card key={category} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {category}
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {count}
                        </p>
                      </div>
                      <Badge className={cn("border", categoryColors[category])}>
                        {category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Filters */}
          <Card className="mb-6 border-border bg-card">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar vídeo..."
                    className="bg-secondary border-border pl-10 text-foreground placeholder:text-muted-foreground"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border text-foreground">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Todas Categorias</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Videos Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className="group border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/50"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-80 transition-all group-hover:opacity-100 group-hover:scale-110">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "absolute top-3 left-3 border",
                      categoryColors[video.category],
                    )}
                  >
                    {video.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(video.date).toLocaleDateString("pt-BR")}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => setSelectedVideo(video)}
                        >
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">
                            {selectedVideo?.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* Video Embed Placeholder */}
                          <div className="aspect-video rounded-lg bg-secondary flex items-center justify-center">
                            <div className="text-center">
                              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                                <Play className="h-10 w-10 text-primary ml-1" />
                              </div>
                              <p className="mt-4 text-muted-foreground">
                                Clique para reproduzir o vídeo
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={cn(
                                  "border",
                                  categoryColors[
                                    selectedVideo?.category || "Ofensiva"
                                  ],
                                )}
                              >
                                {selectedVideo?.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {selectedVideo?.date &&
                                  new Date(
                                    selectedVideo.date,
                                  ).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            <p className="text-muted-foreground">
                              {selectedVideo?.description}
                            </p>
                          </div>

                          <Button
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            asChild
                          >
                            <a
                              href={selectedVideo?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Abrir no YouTube
                            </a>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <p className="mt-4 text-lg font-medium text-foreground">
                  Nenhum vídeo encontrado
                </p>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou adicione um novo vídeo
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
