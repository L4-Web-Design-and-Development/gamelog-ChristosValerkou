// app/routes/index.tsx
import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, Link } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import GameCard, { GameCardProps } from "~/components/GameCard";
import gameCardFallbackImg from "~/assets/svg/gamelog-logo.svg";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => [
  { title: "GameLog" },
  { name: "description", content: "Browse and manage your games" },
];

export const loader: LoaderFunction = async () => {
  const prisma = new PrismaClient();
  const games = await prisma.game.findMany({
    orderBy: { releaseDate: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      rating: true,
      releaseDate: true,
      imageUrl: true,
      category: { select: { title: true } },
    },
  });
  await prisma.$disconnect();
  return json(games);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const raw = form.get("deleteId");
  if (typeof raw === "string") {
    // raw is already a string ID from your DB
    const prisma = new PrismaClient();
    await prisma.game.delete({ where: { id: raw } });
    await prisma.$disconnect();
  }
  return redirect("/");
};

export default function Index() {
  const games = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => {
          const props: GameCardProps = {
            id: game.id,
            title: game.title,
            description: game.description,
            price: game.price,
            rating: game.rating,
            releaseDate: game.releaseDate,
            categoryTitle: game.category?.title ?? "Uncategorized",
            imageUrl: game.imageUrl || gameCardFallbackImg,
          };

          return (
            <article key={game.id} className="flex flex-col">
              <GameCard {...props} />

              <div className="mt-3 flex justify-between">
                {/* EDIT */}
                <Link
                  to={`/edit-game?gameId=${game.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </Link>

                {/* DELETE */}
                <Form method="post" className="inline">
                  <input type="hidden" name="deleteId" value={game.id} />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </Form>
              </div>
            </article>
          );
        })}
      </div>
      <Footer></Footer>
    </main>
  );
}
