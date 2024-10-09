"use client";
import { useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="h-screen w-full bg-slate-300">Test</div>
      <div className="h-screen w-full bg-slate-500">Test</div>
    </>
  );
}
