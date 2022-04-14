import { LIST_TIMERA_BLOCK, LIST_TIMERB_BLOCK } from "./timer.const";

export const channelOption = {
  dmaen: [
    { value: 0, label: "Disable" },
    { value: 1, label: "Enable" },
  ],
  trigger: [
    { value: 7, label: "TACCR0 CCIFG bit", block: LIST_TIMERA_BLOCK[0] },
    { value: 1, label: "TACCR2 CCIFG bit", block: LIST_TIMERA_BLOCK[2] },
    { value: 8, label: "TBCCR0 CCIFG bit", block: LIST_TIMERB_BLOCK[0] },
    { value: 2, label: "TBCCR2 CCIFG bit", block: LIST_TIMERB_BLOCK[2] },
  ],
  transferMode: [
    { value: 0, label: "Single transfer" },
    { value: 4, label: "Repeated single transfer" },
    { value: 1, label: "Block transfer" },
    { value: 5, label: "Repeated block transfer" },
  ],
  increment: [
    { value: 0, label: "is unchanged" },
    { value: 2, label: "is decremented" },
    { value: 3, label: "is incremented" },
  ],
  format: [
    { value: 0, label: "Word" },
    { value: 1, label: "Byte" },
  ],
};
