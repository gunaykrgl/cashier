import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { isAuthenticated } from "./Auth";

export default function Navbar() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            setAuth(result);
        };
        checkAuth();
    }, []);
    
    return (
        <nav className={styles.nav}>
            <div className="logo">
                <Link to="/">
                    <h2>Cashier</h2>
                </Link>
            </div>
            <ul className={styles.navLinks}>
                <NavLink to="/">Home</NavLink>
                {auth && <NavLink to="/manageProducts">Manage Products</NavLink>}
                {!auth && <NavLink to="/login">Login</NavLink>}
                
                {/* //! HANDLE SIGNOUT  */}
                {auth && <NavLink to="/sign-out">Sign Out</NavLink>}
            </ul>
        </nav>
    )
}