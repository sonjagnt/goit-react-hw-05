import clsx from "clsx";
import s from "./Container.module.css";

export default function Container({ children, className }) {
  return <div className={clsx(s.container, className)}>{children}</div>;
}
