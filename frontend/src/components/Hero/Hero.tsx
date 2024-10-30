import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "src/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "src/components/ui/button";

function Hero() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        setMovies(data);
      });
  }, []);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel
      className="w-full h-[1000px]"
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem key={index}>
            <div
              className="flex items-center justify-center w-full h-[80vh] bg-no-repeat bg-center bg-cover relative"
              style={{
                backgroundImage: `url(${movie.poster_url})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
              <div className="relative z-10 space-y-4 mx-4 sm:mx-0">
                <div className="flex space-between w-full">
                  <div>
                    <p className="text-[32px] sm:text-[72px] font-bold text-white">
                      {movie.title}
                    </p>
                    <p className="text-[18px] sm:text-[24px] text-white max-w-[640px]">
                      {movie.description}
                    </p>
                    <Button variant="outline" size="lg" className="mt-4">
                      Boka biljetter NU!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Hero;
