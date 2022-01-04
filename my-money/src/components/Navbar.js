import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";


import styles from "./Navbar.module.css"

export default function Navbar() {
        const {logout} = useLogout();

        const {user} = useContext(AuthContext);
    return (

        <div className={styles.navbar}>
            <nav >
                <ul>
                    <li className={styles.brand}><Link to ="/" >My-Money</Link></li>
                            
                    {!user&&(
                    <>
                    <li><Link to ="/login">Login</Link></li>
                    <li> <Link to ="/signup">Signup</Link></li>
                    </>)
                    }   

                    {user&&(
                        <>
                            <li>Hello {user.displayName}
                            </li>
                            <button onClick={logout } className="btn">Logout</button>
                        </>
                    )

                    }     
                    
                </ul>
            </nav>
            
        </div>
    )
}
