import {NavLink, Form, useRouteLoaderData, useSubmit} from "react-router-dom"
import classes from "./MainNavigation.module.css"
import {jwtDecode} from "jwt-decode";

export default function MainNavigation() {

    const token = useRouteLoaderData('root');
    let decoded = null;
    const submit = useSubmit();

    if (token) {
        if (token !== 'EXPIRED') {
            decoded = jwtDecode(token);
        }
        else {
            submit(null, {action: '/logout', method: 'post'})
            return;
        }
    }

    return <header className={classes.header}>
        <nav>
            <ul className={classes.list}>
                <li> 
                    <NavLink to="/"> Home </NavLink>
                </li>
                {token && (
                <li>
                    <NavLink to={`/demonlist/${decoded.username}`}> Your Demon List </NavLink>
                </li>
                )}
                <li> 
                    <NavLink to="/users"> Users </NavLink>
                </li>
                {!token && (
                    <>
                <li>
                    <NavLink to="/login"> Login </NavLink>
                </li>
                <li> 
                    <NavLink to="/signup"> Sign Up </NavLink> 
                </li>
                    </>
                )}
                {token && (
                <li>
                    <Form action="/logout" method="post">
                    <button className={classes.logoutButton}> Log Out </button>  
                    </Form>
                </li>
                )}
            </ul>
        </nav>
    </header>
}