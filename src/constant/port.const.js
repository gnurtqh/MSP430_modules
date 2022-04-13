export const P1DIR_ADDRESS = 34;
export const P1SEL_ADDRESS = 38;
export const P1OUT_ADDRESS = 33;

export const P2DIR_ADDRESS = 42;
export const P2SEL_ADDRESS = 46;
export const P2OUT_ADDRESS = 41;

export const P3DIR_ADDRESS = 26;
export const P3SEL_ADDRESS = 27;
export const P3OUT_ADDRESS = 25;

export const PORT1 = {
  portNumber: 1,
  dirAddress: P1DIR_ADDRESS,
  selAddress: P1SEL_ADDRESS,
  outAddress: P1OUT_ADDRESS,
};

export const PORT2 = {
  portNumber: 2,
  dirAddress: P2DIR_ADDRESS,
  selAddress: P2SEL_ADDRESS,
  outAddress: P2OUT_ADDRESS,
};

export const PORT3 = {
  portNumber: 3,
  dirAddress: P3DIR_ADDRESS,
  selAddress: P3SEL_ADDRESS,
  outAddress: P3OUT_ADDRESS,
};

export const TIMERA_PORTPIN = [
  { port: PORT1, pinNumber: 0 },
  { port: PORT1, pinNumber: 2 },
  { port: PORT2, pinNumber: 0 },
];
export const TIMERB_PORTPIN = [
  { port: PORT2, pinNumber: 1 },
  { port: PORT2, pinNumber: 2 },
  { port: PORT2, pinNumber: 3 },
  { port: PORT3, pinNumber: 4 },
  { port: PORT3, pinNumber: 5 },
  { port: PORT3, pinNumber: 6 },
  { port: PORT3, pinNumber: 7 },
];
