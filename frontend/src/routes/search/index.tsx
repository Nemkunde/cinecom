import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { Calendar } from "src/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

import { sv } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { format } from "date-fns";
import { cn } from "src/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/search/")({
  component: () => {
    const [date, setDate] = useState<Date>();
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [age, setAge] = useState("");

    const { data, isPending, error, isError } = useQuery({
      queryKey: ["genres"],
      queryFn: async () => {
        const response = await fetch("/api/genres");
        return await response.json();
      },
    });

    if (isPending) {
      return "Loading";
    }

    if (isError) {
      return "Error";
    }

    const handleSearch = async () => {
      const searchParams = new URLSearchParams();
      if (title) searchParams.append("title", title);
      if (genre) searchParams.append("genre", genre);
      if (date) searchParams.append("date", format(date, "yyyy-MM-dd"));

      try {
        const response = await fetch(
          `/api/movies/search?${searchParams.toString()}`
        );
        const data = await response.json();
        console.log("search results: ", data);
      } catch (error) {
        console.log("FAIFALFLAFLAFLA");
      }
    };

    return (
      <div className="w-full h-screen">
        <div className="px-32 mt-24 flex flex-col gap-4">
          <span className="text-4xl text-white">Filmer</span>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Sök film"
              className="bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP", { locale: sv })
                    ) : (
                      <span>Välj datum</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={sv}
                  />
                </PopoverContent>
              </Popover>
              <Select onValueChange={setGenre}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {data.genres.map((genre) => (
                    <SelectItem value={genre.name}>{genre.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setAge}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Ålder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Språk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="max-w-32"
              variant="destructive"
              onClick={handleSearch}
            >
              Sök
            </Button>
          </div>
        </div>
      </div>
    );
  },
});
