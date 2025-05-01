import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { RiMovie2AiLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

function Navigation() {
  return (
    <nav>
      <NavLink to="/" className={s.navlink}>
        <FaHome size={24} />
        Home
      </NavLink>
      <NavLink to="/movies" className={s.navlink}>
        <RiMovie2AiLine size={24} />
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
