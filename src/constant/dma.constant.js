export const DMACTL0_ADDRESS = 290;

export const DMA0CTL_ADDRESS = 464;
export const DMA1CTL_ADDRESS = 476;
export const DMA2CTL_ADDRESS = 488;

export const DMA0SA_ADDRESS = 466;
export const DMA0DA_ADDRESS = 470;
export const DMA0SZ_ADDRESS = 474;

export const DMA1SA_ADDRESS = 478;
export const DMA1DA_ADDRESS = 482;
export const DMA1SZ_ADDRESS = 486;

export const DMA2SA_ADDRESS = 490;
export const DMA2DA_ADDRESS = 494;
export const DMA2SZ_ADDRESS = 498;

export const LIST_CHANNEL = [
  {
    channelCtlAddress: DMA0CTL_ADDRESS,
    daAddress: DMA0DA_ADDRESS,
    saAddress: DMA0SA_ADDRESS,
    szAddress: DMA0SZ_ADDRESS,
  },
  {
    channelCtlAddress: DMA1CTL_ADDRESS,
    daAddress: DMA1DA_ADDRESS,
    saAddress: DMA1SA_ADDRESS,
    szAddress: DMA1SZ_ADDRESS,
  },
  {
    channelCtlAddress: DMA2CTL_ADDRESS,
    daAddress: DMA2DA_ADDRESS,
    saAddress: DMA2SA_ADDRESS,
    szAddress: DMA2SZ_ADDRESS,
  },
];
