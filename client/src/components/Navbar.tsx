import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className="logo">
                <Link to="/">
                    <h2>Cashier</h2>
                </Link>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}