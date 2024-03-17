"use client";

import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";

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

    if (Array.isArray(selected)) {
      // user selected multiple files
      console.log(selected);
      invoke<string>("get_csv_data", { path: selected[0] })
        .then(console.log)
        .catch(console.error);
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <input type="text" />
        <button onClick={selectFile}>点击</button>
      </div>
    </main>
  );
}
