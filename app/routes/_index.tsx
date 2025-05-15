import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import GameCard from "../components/GameCard";
import gameCardFallbackImg from "~/assets/svg/gamelog-logo.svg";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const prisma = new PrismaClient();

  const games = await prisma.game.findMany({
    select: {
      id: true,
      title: true,
      releaseDate: true,
      imageUrl: true,
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  return json({ games });
}

export default function Index() {
  const { games } = useLoaderData<typeof loader>();

  console.log({ games });

  return (
    <div className="grid grid-cols-3 gap-8 container mx-auto">
      {games.map((game) => (
        <GameCard
          key={game.id}
          title={game.title}
          releaseDate={game.releaseDate}
          categoryTitle={game.category?.title || "No Category"}
          imageUrl={game.imageUrl || gameCardFallbackImg}
        />
      ))}
    </div>
  );
}
