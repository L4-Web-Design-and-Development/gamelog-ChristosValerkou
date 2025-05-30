import { Link, Links } from "@remix-run/react";
import siteLogo from "~/assets/svg/gamelog-logo.svg";
import facebook from "~/assets/svg/facebook.svg";
import twitter from "~/assets/svg/twitter.svg";
import instagram from "~/assets/svg/instagram.svg";

export default function Footer() {
  return (
    <div className="container mx-auto flex align-baseline justify-between flex-wrap py- border-cyan-500 border-b-2 py-4">
      <div>
        <img src={siteLogo} alt="GameLog Logo" className="h-16 w-auto" />
      </div>
      <div className="list-disc">
        <div>
          <Link to="\Support" className="font-thin text-xs">
            Support
          </Link>
        </div>
        <div>
          <Link to="\ContactUs" className="font-thin text-xs">
            Contact Us
          </Link>
        </div>
        <div>
          <Link to="\Help" className="font-thin text-xs">
            Help
          </Link>
        </div>
      </div>
      <div className="flex justify-end py-4">
        <img src={facebook} alt="facebook Logo" className="h-5 w-auto" />
        <img src={twitter} alt="twitter Logo" className="h-5 w-auto px-1" />
        <img src={instagram} alt="instagram Logo" className="h-5 w-auto px-1" />
      </div>
    </div>
  );
}
