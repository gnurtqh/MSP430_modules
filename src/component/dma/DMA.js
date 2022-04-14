import DMAChannel from "./DMAChannel";
import styles from "./DMA.module.css";
import PropTypes from "prop-types";

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
DMA.propTypes = {
  listChannel: PropTypes.arrayOf(
    PropTypes.shape({
      channelCtlAddress: PropTypes.number.isRequired,
      saAddress: PropTypes.number.isRequired,
      daAddress: PropTypes.number.isRequired,
      szAddress: PropTypes.number.isRequired,
    })
  ),
  ctlAddress: PropTypes.number.isRequired,
};
export default DMA;
