import {Switch, Route, Redirect} from 'react-router-dom'
import Auth from "../components/auth/Auth";
import Todos from "../components/Todos/Todos";
import Navbar from "../components/navbar/Navbar";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/todos">
                    <Navbar />
                    <Todos />
                </Route>
                <Redirect to="/todos" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <Auth/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}