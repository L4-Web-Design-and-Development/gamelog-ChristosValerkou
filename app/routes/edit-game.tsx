// app/routes/edit-game.tsx
import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

type LoaderData = {
  id: string;              // string ID
  title: string;
  description: string;
  price: number;
  rating: number;
  releaseDate: string;     // "YYYY-MM-DD"
  categoryId: string | null;
};

export const meta: MetaFunction = () => [
  { title: "Edit Game" },
  { name: "description", content: "Edit a game's details" },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const gameId = url.searchParams.get("gameId");
  if (!gameId) throw new Response("Missing gameId", { status: 400 });

  const prisma = new PrismaClient();
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      rating: true,
      releaseDate: true,
      categoryId: true,
    },
  });
  await prisma.$disconnect();
  if (!game) throw new Response("Game not found", { status: 404 });

  return json({
    ...game,
    releaseDate: game.releaseDate.toISOString().slice(0, 10),
  } as LoaderData);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const id = form.get("id");
  if (typeof id !== "string") throw new Response("Missing id", { status: 400 });

  const title = String(form.get("title") ?? "");
  const description = String(form.get("description") ?? "");
  const price = parseFloat(String(form.get("price") ?? ""));
  const rating = parseFloat(String(form.get("rating") ?? ""));
  const releaseDate = String(form.get("releaseDate") ?? "");
  const catRaw = form.get("categoryId");
  const categoryId =
    typeof catRaw === "string" && catRaw !== "" ? catRaw : null;

  const prisma = new PrismaClient();
  await prisma.game.update({
    where: { id },
    data: {
      title,
      description,
      price,
      rating,
      releaseDate: new Date(releaseDate),
      categoryId,
    },
  });
  await prisma.$disconnect();

  return redirect("/");
};

export default function EditGame() {
  const game = useLoaderData<LoaderData>();

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit “{game.title}”</h1>
      <Form method="post" className="space-y-4">
        <input type="hidden" name="id" value={game.id} />

        <label className="block">
          <span className="font-semibold">Title</span>
          <input
            name="title"
            defaultValue={game.title}
            className="w-full mt-1 p-2 border rounded text-black placeholder-gray-500"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Description</span>
          <textarea
            name="description"
            defaultValue={game.description}
            className="w-full mt-1 p-2 border rounded text-black placeholder-gray-500"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Price ($)</span>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={String(game.price)}
            className="w-full mt-1 p-2 border rounded text-black placeholder-gray-500"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Rating (0–5)</span>
          <input
            type="number"
            step="0.1"
            name="rating"
            defaultValue={String(game.rating)}
            className="w-full mt-1 p-2 border rounded text-black placeholder-gray-500"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Release Date</span>
          <input
            type="date"
            name="releaseDate"
            defaultValue={game.releaseDate}
            className="w-full mt-1 p-2 border rounded text-black placeholder-gray-500"
          />
        </label>

        <label className="block">
          <span className="font-semibold">Category ID</span>
          <input
            type="text"
            name="categoryId"
            defaultValue={game.categoryId ?? ""}
            className="w-full mt-1 p-2 border rounded text-black placeholder-gray-500"
          />
          <small className="text-gray-500">
            (Or replace this with a{" "}
            <code>&lt;select name=&quot categoryId&quot&gt;</code> that lists your
            categories.)
          </small>
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </Form>
    </main>
  );
}
