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
    periodAddress: 65538,
    ratioAddress: 65540,
    periodIntrAddress: 65542,
  },
  {
    blockCtlAddress: TACCTL1_ADDRESS,
    blockRegAddress: TACCR1_ADDRESS,
    periodAddress: 65544,
    ratioAddress: 65546,
    periodIntrAddress: 65548,
  },
  {
    blockCtlAddress: TACCTL2_ADDRESS,
    blockRegAddress: TACCR2_ADDRESS,
    periodAddress: 65550,
    ratioAddress: 65552,
    periodIntrAddress: 65554,
  },
];

export const LIST_TIMERB_BLOCK = [
  {
    blockCtlAddress: TBCCTL0_ADDRESS,
    blockRegAddress: TBCCR0_ADDRESS,
    periodAddress: 65556,
    ratioAddress: 65558,
    periodIntrAddress: 65560,
  },
  {
    blockCtlAddress: TBCCTL1_ADDRESS,
    blockRegAddress: TBCCR1_ADDRESS,
    periodAddress: 65562,
    ratioAddress: 65564,
    periodIntrAddress: 65566,
  },
  {
    blockCtlAddress: TBCCTL2_ADDRESS,
    blockRegAddress: TBCCR2_ADDRESS,
    periodAddress: 65568,
    ratioAddress: 65570,
    periodIntrAddress: 65572,
  },
  {
    blockCtlAddress: TBCCTL3_ADDRESS,
    blockRegAddress: TBCCR3_ADDRESS,
    periodAddress: 65574,
    ratioAddress: 65576,
    periodIntrAddress: 65578,
  },
  {
    blockCtlAddress: TBCCTL4_ADDRESS,
    blockRegAddress: TBCCR4_ADDRESS,
    periodAddress: 65580,
    ratioAddress: 65582,
    periodIntrAddress: 65584,
  },
  {
    blockCtlAddress: TBCCTL5_ADDRESS,
    blockRegAddress: TBCCR5_ADDRESS,
    periodAddress: 65586,
    ratioAddress: 65588,
    periodIntrAddress: 65590,
  },
  {
    blockCtlAddress: TBCCTL6_ADDRESS,
    blockRegAddress: TBCCR6_ADDRESS,
    periodAddress: 65592,
    ratioAddress: 65594,
    periodIntrAddress: 65596,
  },
];
