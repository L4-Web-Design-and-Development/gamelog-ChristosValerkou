interface GameCardProps {
  title: string;
  releaseDate: string;
  categoryTitle: string;
}
export default function GameCard(props: GameCardProps) {
  const formattedDate = props.releaseDate.slice(0, 10);

  return (
    <div className="flex flex-col bg-stone-900 rounded-md overflow-hidden">
      <div className="relative h-60 bg-stone-300">
        <div className="absolute inset-0">
          <img
            src=""
            alt="Game Cover"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-between w-2/3">
            <h3 className="font-bold text-2xl text-slate-300">{props.title}</h3>
            <p className="text-cyan-300 uppercase text-sm font-semibold">
              {props.categoryTitle}
            </p>
            <p className="text-slate-200/60 text-sm font-semibold">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
