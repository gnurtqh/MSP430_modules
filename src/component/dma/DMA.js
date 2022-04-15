import DMAChannel from "./DMAChannel";
import styles from "./DMA.module.css";

function DMA({ listChannel, ctlAddress, state }) {
  return (
    <div className={styles.dma}>
      <div className={styles.top}>
        <div className={styles.label}>DMA</div>
      </div>
      <div className={styles.listchannel}>
        {listChannel.map((item, index) => (
          <DMAChannel
            ctlAddress={ctlAddress}
            key={index}
            index={index}
            channel={item}
            state={state}
          />
        ))}
      </div>
    </div>
  );
}

export default DMA;
