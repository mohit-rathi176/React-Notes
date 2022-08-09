import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <header>
      <nav className={classes.navbar}>
        <div className={classes["navbar-title"]}>React Notes</div>
        <div className={classes["navbar-menu"]}>
          <ul className={classes["navbar-menu-list"]}>
            {!props.auth && <li>
              <NavLink
                to="/login"
                className={(navData) =>
                  navData.isActive ? classes.active : null
                }
              >
                Login
                <i className="fa-solid fa-right-to-bracket"></i>
              </NavLink>
            </li>}
            {!props.auth && <li>
              <NavLink
                to="/register"
                className={(navData) =>
                  navData.isActive ? classes.active : null
                }
              >
                Register
                <i className="fa-solid fa-user-plus"></i>
              </NavLink>
            </li>}
            {props.auth && <li>
              <a onClick={props.logout}>Logout<i className="fa-solid fa-right-from-bracket"></i></a>
            </li>}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
