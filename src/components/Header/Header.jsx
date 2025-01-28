import "./header.css"

export default function Header() {
    return (
        <div>
        <header className="header"> 
            <div className="textItem">
            <h1> Geometry Dash Demon Tracker</h1>
            <p className="by"> Created by:  <span className="author"> Shizzal </span></p>
            <p> A web application created to log your demon completions and progress in GD. </p>
            </div>
        </header>
        </div>
    )
}