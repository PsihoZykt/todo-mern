import AuthContext from "../../context/AuthContext";
import {useContext} from "react";
import {useMessage} from "../../hooks/message.hook";

const Navbar = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()

    const logoutHandler = () => {
        auth.logout();
        message("Logout is success")
    }
    return (
        <nav>
            <div className="nav-wrapper teal lighten-2">
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <a className="waves-effect waves-light btn blue-grey darken-1" onClick={logoutHandler} > logout </a>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;