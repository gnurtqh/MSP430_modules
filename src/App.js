import { useEffect, useState } from "react";
import Main from "./component/Main";
import initialMemory from "./constant/memory.const";
import { MemoryContext } from "./context/memory.context";

export default function App() {
  const [memory, setMemory] = useState(initialMemory);
  const [isRunning, setRunning] = useState(false);

  const handleStateChange = () => {
    setRunning(!isRunning);
  };

  useEffect(() => {
    let runningIntervalID = 0;
    if (isRunning) {
      runningIntervalID = setInterval(() => {}, 100);
    } else {
      clearInterval(runningIntervalID);
    }
    return () => {
      clearInterval(runningIntervalID);
    };
  }, [isRunning]);

  return (
    <MemoryContext.Provider value={{ memory, setMemory }}>
      <Main
        memory={memory}
        state={isRunning}
        onStateChange={handleStateChange}
      />
    </MemoryContext.Provider>
  );
}
