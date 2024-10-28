import { Button } from "../ui/button";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

interface Props {
  auditorium: string;
  movie: string;
  startTime: string;
  thumbnail: string;
}

function ScreeningBox({ auditorium, movie, startTime, thumbnail }: Props) {
  return (
    <div className="flex-col">
      <div className="text-2xl text-[#F8C496] mb-4">
        <span className="capitalize">
          {format(new Date(startTime), "EEEE d LLLL", { locale: sv })}
        </span>
      </div>
      <div className="flex items-center justify-between rounded-md p-6 mb-6 bg-[#F0EBD6]">
        <div className="flex gap-4 items-center ">
          <img src={thumbnail} width={100} height={40} />
          <div className="flex flex-col text-black">
            <span className="text-2xl font-bold">{movie}</span>
            <span>{auditorium}</span>
            <span>{format(new Date(startTime), "HH:mm")}</span>
          </div>
        </div>
        <Button variant={"destructive"}>Boka Biljett</Button>
      </div>
    </div>
  );
}

export default ScreeningBox;
