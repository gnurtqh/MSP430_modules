import { useState } from "react";
import Main from "./component/Main";
import { MemoryContext } from "./context/memory";

export default function App() {
  const [memory, setMemory] = useState([]);
  return (
    <MemoryContext.Provider value={{ memory, setMemory }}>
      <Main memory={memory} />
    </MemoryContext.Provider>
  );
}
