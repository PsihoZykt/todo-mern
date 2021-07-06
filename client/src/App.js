import 'materialize-css'
import AuthContext from "./context/AuthContext";
import {useRoutes} from "./routes/routes";
import useAuth from "./hooks/auth.hook";
import {BrowserRouter} from "react-router-dom";


function App() {
    const {jwtToken, login, logout, userId} = useAuth()
    const isAuthenticated = !!jwtToken
    const routes = useRoutes(isAuthenticated)

    return (
        <BrowserRouter>
             <AuthContext.Provider value={{jwtToken, login, logout, userId}}>
                <div>
                    {routes}
                </div>
            </AuthContext.Provider>
        </BrowserRouter>

    );
}

export default App;
