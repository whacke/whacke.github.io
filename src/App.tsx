import { useEffect, useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import MainContent from "./components/mainContent";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [showIntro, setShowIntro] = useState(() => true);

  useEffect(() => {
    if (!showIntro) {
      sessionStorage.setItem("introPlayed", "true");
    }
  }, [showIntro]);

  return (
    <>
      {/* Show animation only once per session */}
      {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}
      {!showIntro && <MainContent onFinish={() => setCount((c) => c + 1)} />}
      
    </>
  );
}

export default App;
