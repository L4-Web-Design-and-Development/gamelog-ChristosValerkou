// app/components/GameCard.tsx

export interface GameCardProps {
  id: string;             // ← string, not number
  title: string;
  description: string;
  price: number;
  rating: number;
  releaseDate: string;    // ISO string
  categoryTitle: string;
  imageUrl: string;
}

export default function GameCard({
 
  title,
  description,
  price,
  rating,
  releaseDate,
  categoryTitle,
  imageUrl,
}: GameCardProps) {
  // slice off the time portion
  const formattedDate = releaseDate.slice(0, 10);

  return (
    <div className="flex flex-col bg-stone-900 rounded-md overflow-hidden shadow-lg">
      <div className="relative h-60">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-md"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-2xl text-slate-300 mb-1">{title}</h3>
        <p className="text-cyan-300 uppercase text-sm font-semibold mb-1">
          {categoryTitle}
        </p>
        <p className="text-slate-200/60 text-sm font-semibold mb-4">
          {formattedDate}
        </p>

        <p className="text-slate-200/80 text-sm mb-4 flex-1">
          {description}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-semibold text-slate-100">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-yellow-400">
            ★ {rating.toFixed(1)} / 5
          </span>
        </div>
      </div>
    </div>
  );
}
