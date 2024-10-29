import { createFileRoute, useRouter, useSearch } from "@tanstack/react-router";
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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "src/components/Movies/SearchResult";
import React from "react";

export const Route = createFileRoute("/search/")({
  component: () => {
    const router = useRouter();

    const [date, setDate] = useState<Date>();
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [age, setAge] = useState("");
    const [language, setLanguage] = useState("");

    const [foundMovies, setFoundMovies] = useState();

    const { data, isPending, error, isError } = useQuery({
      queryKey: ["genres"],
      queryFn: async () => {
        const response = await fetch("/api/genres");
        return await response.json();
      },
    });

    const handleSearch = async (params = {}) => {
      const searchParams = new URLSearchParams();
      if (params.title || title)
        searchParams.append("title", params.title || title);
      if (params.genre || genre)
        searchParams.append("genre", params.genre || genre);
      if (params.date || date)
        searchParams.append("date", params.date || format(date, "yyyy-MM-dd"));
      if (params.age || age) searchParams.append("ageLimit", params.age || age);
      if (params.language || language)
        searchParams.append("language", params.language || language);

      router.navigate({
        to: "/search",
        search: {
          title: params.title || title || undefined,
          genre: params.genre || genre || undefined,
          date: params.date || (date ? format(date, "yyyy-MM-dd") : undefined),
          ageLimit: params.age || age || undefined,
          language: params.language || language || undefined,
        },
      });

      try {
        const response = await fetch(
          `/api/movies/search?${searchParams.toString()}`
        );
        const data = await response.json();
        setFoundMovies(data);
      } catch (error) {
        return "Error";
      }
    };

    const handleClear = () => {
      setTitle("");
      setGenre("");
      setDate(undefined);
      setAge("");
      setLanguage("");
      setFoundMovies(undefined);

      router.navigate({ to: "/search", search: {} });
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const initialParams = {
        title: urlParams.get("title") || "",
        genre: urlParams.get("genre") || "",
        date: urlParams.get("date") || "",
        age: urlParams.get("age") || "",
        language: urlParams.get("language") || "",
      };

      if (initialParams.title) setTitle(initialParams.title);
      if (initialParams.genre) setGenre(initialParams.genre);
      if (initialParams.date) setDate(new Date(initialParams.date));
      if (initialParams.age) setAge(initialParams.age);
      if (initialParams.language) setLanguage(initialParams.language);

      if (Object.values(initialParams).some((value) => value !== "")) {
        handleSearch(initialParams);
      }
    }, []);

    if (isPending) {
      return "Loading";
    }

    if (isError) {
      return "Error";
    }

    return (
      <div className="w-full h-screen">
        <div className="h-full">
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
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Språk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Svenska">Svenska</SelectItem>
                    <SelectItem value="Engelska">Engelska</SelectItem>
                    <SelectItem value="Danska">Danska</SelectItem>
                    <SelectItem value="Tyska">Tyska</SelectItem>
                    <SelectItem value="Spanska">Spanska</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4">
                <Button
                  className="max-w-32"
                  variant="destructive"
                  onClick={handleSearch}
                >
                  Sök
                </Button>
                <Button
                  className="max-w-32"
                  variant="destructive"
                  onClick={handleClear}
                >
                  Rensa
                </Button>
              </div>
            </div>
            {foundMovies?.map((movie) => {
              return movie.screenings.map((screening) => {
                return <SearchResult movie={movie} screening={screening} />;
              });
            })}
          </div>
        </div>
      </div>
    );
  },
});
