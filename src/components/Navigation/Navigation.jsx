import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { RiMovie2AiLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import Container from "../../ui/Container/Container";

function Navigation() {
  return (
    <nav>
      <Container className={s.container}>
        <NavLink to="/" className={s.navlink}>
          <FaHome size={24} />
          Home
        </NavLink>
        <NavLink to="/movies" className={s.navlink}>
          <RiMovie2AiLine size={24} />
          Movies
        </NavLink>
      </Container>
    </nav>
  );
}

export default Navigation;
