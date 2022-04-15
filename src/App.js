import { useState } from "react";
import Main from "./component/Main";
import initialMemory from "./constant/memory.const";
import { MemoryContext } from "./context/memory.context";

export default function App() {
  const [memory, setMemory] = useState(initialMemory);

  return (
    <MemoryContext.Provider value={{ memory, setMemory }}>
      <Main memory={memory} />
    </MemoryContext.Provider>
  );
}
