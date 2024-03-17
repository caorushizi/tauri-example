"use client";

import Greet from "./greet";
import { open } from "@tauri-apps/api/dialog";

export default function Home() {
  const selectFile = async () => {
    const selected = await open({
      multiple: true,
      filters: [
        {
          name: "Image",
          extensions: ["csv", "jpeg"],
        },
      ],
    });
    console.log(selected);
    if (Array.isArray(selected)) {
      // user selected multiple files
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Greet />
      <div>
        <input type="text" />
        <button onClick={selectFile}>点击</button>
      </div>
    </main>
  );
}
