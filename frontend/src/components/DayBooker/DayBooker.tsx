import { useNavigate } from "@tanstack/react-router";
import { addDays, format, isToday } from "date-fns";
import { sv } from "date-fns/locale";

function DayBooker() {
  return (
    <div className="bg-[#666] rounded-lg p-4 my-24">
      <div className="flex flex-col">
        <span className="text-2xl text-white font-bold uppercase">
          Välj dag du vill gå på bio
        </span>
        <div className="flex flex-wrap gap-3 mt-8">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <DayCard key={day} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DayBooker;

const DayCard = ({ day }: { day: number }) => {
  const navigate = useNavigate();

  const getFormattedDay = (dayOffset: number) => {
    const targetDate = addDays(new Date(), dayOffset);
    const dayName = isToday(targetDate)
      ? "Idag"
      : format(targetDate, "EEE", { locale: sv });
    const date = format(targetDate, "d MMMM", { locale: sv });
    return { dayName, date, targetDate };
  };

  const { dayName, date, targetDate } = getFormattedDay(day);

  const handleClick = () => {
    const dateString = format(targetDate, "yyyy-MM-dd");
    navigate({ to: "/search", search: { date: dateString } });
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center rounded-md flex-wrap"
    >
      <div
        className={`flex flex-col shadow-md ${isToday(targetDate) ? "border border-2 bg-zinc-900 border-green-500 text-white" : "bg-zinc-900 text-white"} p-2 rounded-md hover:bg-white hover:text-black hover:cursor-pointer`}
      >
        <span className="capitalize">{dayName}</span>
        <span className="capitalize">{date}</span>
      </div>
    </div>
  );
};
