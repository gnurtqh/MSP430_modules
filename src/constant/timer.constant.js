export const ACLK = 32000;
export const SMCLK = 1000000;
export const TACTL_ADDRESS = 352;
export const TAR_ADDRESS = 368;

export const TACCR0_ADDRESS = 370;
export const TACCR1_ADDRESS = 372;
export const TACCR2_ADDRESS = 374;

export const TACCTL0_ADDRESS = 354;
export const TACCTL1_ADDRESS = 356;
export const TACCTL2_ADDRESS = 358;

export const TBCTL_ADDRESS = 384;
export const TBR_ADDRESS = 400;
export const TBCCR0_ADDRESS = 402;
export const TBCCR1_ADDRESS = 404;
export const TBCCR2_ADDRESS = 406;
export const TBCCR3_ADDRESS = 408;
export const TBCCR4_ADDRESS = 410;
export const TBCCR5_ADDRESS = 412;
export const TBCCR6_ADDRESS = 414;

export const TBCCTL0_ADDRESS = 386;
export const TBCCTL1_ADDRESS = 388;
export const TBCCTL2_ADDRESS = 390;
export const TBCCTL3_ADDRESS = 392;
export const TBCCTL4_ADDRESS = 394;
export const TBCCTL5_ADDRESS = 396;
export const TBCCTL6_ADDRESS = 398;

export const LIST_TIMERA_BLOCK = [
  {
    blockCtlAddress: TACCTL0_ADDRESS,
    blockRegAddress: TACCR0_ADDRESS,
  },
  {
    blockCtlAddress: TACCTL1_ADDRESS,
    blockRegAddress: TACCR1_ADDRESS,
  },
  {
    blockCtlAddress: TACCTL2_ADDRESS,
    blockRegAddress: TACCR2_ADDRESS,
  },
];

export const LIST_TIMERB_BLOCK = [
  {
    blockCtlAddress: TBCCTL0_ADDRESS,
    blockRegAddress: TBCCR0_ADDRESS,
  },
  {
    blockCtlAddress: TBCCTL1_ADDRESS,
    blockRegAddress: TBCCR1_ADDRESS,
  },
  {
    blockCtlAddress: TBCCTL2_ADDRESS,
    blockRegAddress: TBCCR2_ADDRESS,
  },
  {
    blockCtlAddress: TBCCTL3_ADDRESS,
    blockRegAddress: TBCCR3_ADDRESS,
  },
  {
    blockCtlAddress: TBCCTL4_ADDRESS,
    blockRegAddress: TBCCR4_ADDRESS,
  },
  {
    blockCtlAddress: TBCCTL5_ADDRESS,
    blockRegAddress: TBCCR5_ADDRESS,
  },
  {
    blockCtlAddress: TBCCTL6_ADDRESS,
    blockRegAddress: TBCCR6_ADDRESS,
  },
];
