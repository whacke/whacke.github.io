import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../../public/vite.svg";
import "../App.css";
export default function MainContent({ onFinish }: { onFinish: () => void }) {
   const [count, setCount] = useState(0);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl mt-4">Coming soon: Vite + React</h1>
        <div className="card mt-4">
          <button onClick={() => setCount((c) => c + 1)}>
            TODOs left unfinished: {count}
          </button>
        </div>
      </div>
    );
}
