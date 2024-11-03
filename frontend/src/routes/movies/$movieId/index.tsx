import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import MovieInformationBox from "src/components/Movies/MovieInformationBox";
import Screenings from "src/components/Movies/Screenings";
import { Dialog, DialogContent, DialogTrigger } from "src/components/ui/dialog";

export const Route = createFileRoute("/movies/$movieId/")({
  component: () => {
    const { movieId } = Route.useParams();

    const {
      isPending,
      error,
      data: movie,
    } = useQuery({
      queryKey: ["movie", movieId],
      queryFn: async () => {
        const response = await fetch(`/api/movies/${movieId}`);
        return await response.json();
      },
    });

    const {
      isPending: screeningsPending,
      error: screeningsError,
      data: screenings,
    } = useQuery({
      queryKey: ["movie", "screening", movieId],
      queryFn: async () => {
        const response = await fetch(`/api/screenings/${movieId}`);
        return await response.json();
      },
    });

    if (isPending || screeningsPending) return "Loading!!!!!...";

    if (error || screeningsError)
      return (
        "An error has occurred: " + error?.message || screeningsError?.message
      );

    return (
      <div className="flex flex-col items-center justify-center">
        <div
          className="flex items-center justify-center w-[70vw] h-[70vh] bg-no-repeat bg-center bg-cover relative"
          style={{
            backgroundImage: `url(${movie.poster_url})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
          <div className="relative z-10 space-y-4 mx-4 sm:mx-0">
            <div className="flex space-between w-full">
              <div className="flex flex-col justify-center">
                <p className="text-[32px] sm:text-[72px] font-bold text-white">
                  {movie.title}
                </p>
                <Dialog>
                  <DialogTrigger className="p-2">
                    {/* <Button variant="outline" size="lg"> */}
                    Se trailer
                    {/* </Button> */}
                  </DialogTrigger>
                  <DialogContent className="min-w-[50%] min-h-[50%]">
                    <iframe
                      width="100%"
                      height="100%"
                      src={movie.trailer_url}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        <div className="md:px-32 px-8 mt-24 text-white w-full">
          <h2 className="text-4xl font-bold uppercase">Om filmen</h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <MovieInformationBox>{movie.description}</MovieInformationBox>
            <MovieInformationBox>
              <div className="flex flex-col gap-4 min-w-[350px]">
                <div className="flex justify-between">
                  <span>Speltid</span>
                  <span>{movie.duration}</span>
                </div>
                <div className="w-full h-[2px] bg-[#F0EBD6]" />
                <div className="flex justify-between">
                  <span>Åldersgräns</span>
                  <span>{movie.age_limit}</span>
                </div>
                <div className="w-full h-[2px] bg-[#F0EBD6]" />
                <div className="flex justify-between">
                  <span>Språk</span>
                  <span>{movie.language}</span>
                </div>
                <div className="w-full h-[2px] bg-[#F0EBD6]" />
                <div className="flex justify-between">
                  <span>Genre</span>
                  <div className="flex gap-2">
                    {movie?.genres?.map((genre) => <span>{genre}</span>)}
                  </div>
                </div>
                <div className="w-full h-[2px] bg-[#F0EBD6]" />
                <div className="flex justify-between">
                  <span>Regissör</span>
                  <div className="flex gap-2">
                    {movie?.director?.map((director) => (
                      <span>{director}</span>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[2px] bg-[#F0EBD6]" />
                <div className="flex justify-between">
                  <span>Skådespelare</span>
                  <div className="flex gap-2">
                    {movie?.actors?.map((actor) => (
                      <span className="gap-2">{actor} </span>
                    ))}
                  </div>
                </div>
              </div>
            </MovieInformationBox>
          </div>
          <Screenings
            movie={movie}
            screenings={screenings}
            thumbnail={movie.poster_url}
            movieId={movieId}
          />
        </div>
      </div>
    );
  },
});
