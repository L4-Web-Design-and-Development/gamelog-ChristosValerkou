import { Link } from "@remix-run/react";
import siteLogo from "~/assets/svg/gamelog-logo.svg";
import Header from "./Header";

export default function Navbar() {
  return (
    <nav className="container mx-auto flex justify-between flex-wrap py-8 p-8">
      <div>
        <Link to="/">
          <img src={siteLogo} alt="GameLog Logo" className="h-16 w-auto" />
        </Link>
      </div>
      <div className="flex items-end gap-8">
        <Link to="/games" className="font-semibold text-pretty">
          Games
        </Link>
        <Link to="/about" className="font-semibold text-pretty">
          About
        </Link>
        <Link to="/blog" className="font-semibold text-pretty">
          Blog
        </Link>
      </div>
      <Header></Header>
    </nav>
  );
}
