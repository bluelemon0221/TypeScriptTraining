import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="py-5 px-10 border-b flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-extrabold">
          <Link href="/">Next.js13 Blog</Link>
        </h1>
      </div>
      <nav className="text-sm font-medium">
        <Link
          href="/articles/new"
          className="bg-orange-500 p-3 rounded-md hover:bg-orange-300"
        >
          記事を書く
        </Link>
      </nav>
    </header>
  );
};

export default Header;
