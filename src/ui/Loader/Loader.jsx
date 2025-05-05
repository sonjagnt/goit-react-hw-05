import { RotatingLines } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.wrapper}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeColor="#fafafa"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;
