import { DMACTL0_ADDRESS } from "./dma.const";
import { TACTL_ADDRESS } from "./timer.const";

const initialMemory = [];
initialMemory[TACTL_ADDRESS] = 2 ** 8;
initialMemory[DMACTL0_ADDRESS] = 1911;

export default initialMemory;
