import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className="logo">
                <Link to="/">
                    <h2>Cashier</h2>
                </Link>
            </div>
            <ul className={styles.navLinks}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
            </ul>
        </nav>
    )
}