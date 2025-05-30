import { Link } from "@remix-run/react";
import hero from "~/assets/png/Hero with Tagline.png";

export default function Header() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <img
          src={hero}
          alt="Hero Logo"
          className="relative w-full object-fill"
        />
        <text className="absolute left-60 top-40 font-semibold text-8xl">
          Build your
        </text>
        <text className="absolute left-60 top-64 font-semibold text-8xl text-cyan-500">
          gaming
        </text>
        <text className="absolute left-60 top-96 font-semibold text-8xl">
          portfolio
        </text>
        <Link
          to="/add-game"
          className="absolute p-1 left-60 w-1/4 text-center bottom-1/3 bg-transparent border border-cyan-500 text-cyan-500 rounded hover:bg-blue-700"
        >
          Add Games
        </Link>
      </div>
    </div>
  );
}
