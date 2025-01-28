import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Error() {
    const error = useRouteError();

    let title = 'What the butts?';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = JSON.parse(error.data).message;
    }

    if (error.status === 404) {
        message = 'Could not find the page.';
    }

    return (
        <>
            <MainNavigation />
            <div className="defaultText">
            <h1> {title} </h1>
                <p> {message} </p>
            </div>    
        </>
    )
}