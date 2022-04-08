import CCBlock from "./CCBlock";
import styles from "./Timer.module.css";
import ConfigTimer from "./ConfigTimer";
import PropTypes from "prop-types";

function Timer({ listCCBlock, type, ctlAddress }) {
  return (
    <div className={styles.timer}>
      <div className={styles.top}>
        <div className={styles.label}>Timer {type}</div>
        <ConfigTimer ctlAddress={ctlAddress} />
      </div>
      <div className={styles.listccblock}>
        {listCCBlock.map((item, index) => (
          <CCBlock key={index} index={index} block={item} type={type} />
        ))}
      </div>
    </div>
  );
}
Timer.propTypes = {
  listCCBlock: PropTypes.arrayOf(
    PropTypes.shape({
      blockCtlAddress: PropTypes.number.isRequired,
      blockRegAddress: PropTypes.number.isRequired,
    })
  ),
  type: PropTypes.string.isRequired,
  ctlAddress: PropTypes.number.isRequired,
};
export default Timer;
