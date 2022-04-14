export const blockOption = {
  mode: [
    { value: 0, label: "Compare mode" },
    { value: 1, label: "Capture mode" },
  ],
  interruptEnabled: [
    { value: 0, label: "Disable" },
    { value: 1, label: "Enable" },
  ],
  outBit: [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
  ],
  captureMode: [
    { value: 0, label: "No capture" },
    { value: 1, label: "Capture on rising edge" },
    { value: 2, label: "Capture on falling edge" },
    { value: 3, label: "Capture on both edges" },
  ],
  outMode: [
    { value: 0, label: "OUT bit value" },
    { value: 1, label: "Set" },
    { value: 2, label: "Toggle/reset" },
    { value: 3, label: "Set/reset" },
    { value: 4, label: "Toggle" },
    { value: 5, label: "Reset" },
    { value: 6, label: "Toggle/set" },
    { value: 7, label: " Reset/set" },
  ],
};
