import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header-container bg-white px-10 py-3 flex justify-between w-full shadow-header-shadow">
      <div className="left flex items-center">
        <div className="logo-wrapper pr-10">
          <Image
            src="/assets/chainplay-logo.svg"
            width={192}
            height={32}
            alt="chainplay logo"
          />
        </div>
        <nav className="flex gap-7 font-medium pr-8">
          <div>Explore</div>
          <div>Genres</div>
          <div>WhiteLists</div>
          <div>Learn</div>
          <div>Community</div>
        </nav>
        <div className="search-wrapper relative">
          <Image
            className="absolute top-1/2 left-4 -translate-y-1/2"
            src="/assets/search-icon.svg"
            width={16}
            height={16}
            alt="chainplay logo"
          />
          <input
            type="text"
            className="bg-blue-gray-100 h-9.5 w-338px rounded-100px outline-none text-sm py-2 pl-12 pr-11 text-black-100 placeholder:text-gray-500 placeholder:text-sm"
            placeholder="Search NFTs / Collections / Addresses"
          />
        </div>
      </div>
      <div className="right flex gap-6 items-center">
        <div className="login font-medium text-base">Log in</div>
        <div className="signup bg bg-linear-gradient px-3 h-10 rounded-10px flex justify-center items-center font-medium text-base text-white">
          Sign up
        </div>
      </div>
    </header>
  );
};

export default Header;
