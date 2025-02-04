import {Form, redirect, useActionData} from "react-router-dom"
export default function Login({mode}) {

    const data = useActionData()

    let isRegistering = false;
    if (mode === "signup") {
    isRegistering = true;
   }
    return (
        <> 
            <Form method="post">
                <div className="accountPage"> 
                <h1 className="pageHeader"> {isRegistering ? "Create Account" : "Login"} </h1>
                {data && data.errors && <ul>
                    {Object.values(data.errors).map((err) => (
                        <li className="errorMessages" key={err}> {err} </li>
                    ))} 
                    </ul>}
                    {data && data.message && <p className="errorMessages"> {data.message} </p>}
                <div className="inputFields">
                    <label htmlFor="username"> Username </label>
                    <input id="username" type="username" name="username" required />
                    <label htmlFor="password"> Password </label>
                    <input id="password" type="password" name="password" required/>
                    <button className="loginButton"> {isRegistering ? "Sign Up" : "Log In"} </button>
                </div>
            </div>
            </Form>
        </>
    )
}

export async function action({request}) {

    const requestType = new URL(request.url)
    if (requestType.pathname !== '/login' && requestType.pathname !== '/signup') {
        //throw json({message: "Unsupported mode."}, {status: 422}); //TO-DO: Refer to useRouteError from react router dom. Add error element
    }

    const data = await request.formData()
    const authData = {
        username: data.get("username"),
        password: data.get("password")
    }
    
    console.log(authData)
    const response = await fetch('https://gd-demon-tracker-be-production.up.railway.app' + requestType.pathname, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });

    if (response.status === 459) { //459 is the error code we use for login/signup failure.
        return response;
    }

    if (response.status === 401) { //401 is used for fetching errors related to authentication on the backend.
        return response;
    }

    if (!response.ok) {
        throw new Response(JSON.stringify({message: "Could not authenticate user."}, {status: 500}));
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());
    
    return redirect(`..`)
}

