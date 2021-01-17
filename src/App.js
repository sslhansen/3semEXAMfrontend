// import "./App.css";
import React, {useState, useEffect} from "react";
import DoLogin from "./login.js";
import {
    Switch,
    Route,
    NavLink,
    useLocation,
    useHistory
} from "react-router-dom";
import facade from "./apiFacade";
import AddDog from "./addDog.js";
import ListOfDogs from "./listOfDogs.js";
import DogBreeds from "./dogBreeds.js";
import SpecificDogBreed from "./specificDogBreed.js";
import Calls from "./calls.js";
import SpecificCalls from "./specificCalls.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    let history = useHistory();
    const goHome = () => {
        history.push("/");
    };
    useEffect(() => {
        if (isLoggedIn) {
            setIsAdmin(facade.checkRole());
        }
    }, [isLoggedIn]);

    return (
        <div>
            <Header loginMsg={
                    isLoggedIn ? "Logout" : "Login"
                }
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <DoLogin loggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn}
                        goHome={goHome}/>
                </Route>
                <Route exact path="/dogBreeds">
                    <DogBreeds/>
                </Route>
                <Route exact path="/specificDogBreeds">
                    <SpecificDogBreed/>
                </Route>
                {
                isLoggedIn && (
                    <Route exact path="/addDog">
                        <AddDog/>
                    </Route>
                )
            }
                {
                isLoggedIn && (
                    <Route exact path="/listOfDogs">
                        <ListOfDogs/>
                    </Route>
                )
            }
                {
                isAdmin && (
                    <Route exact path="/calls">
                        <Calls/>
                    </Route>
                )
            }
                {
                isAdmin && (
                    <Route exact path="/specificCalls">
                        <SpecificCalls/>
                    </Route>
                )
            }
                <Route>
                    <NoMatch/>
                </Route>
            </Switch>
        </div>
    );
}

function Header({isLoggedIn, loginMsg, isAdmin}) {
    return (
        <ul className="header">
            <li>
                <NavLink exact activeClassName="active" to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink exact activeClassName="active" to="/dogBreeds">
                    Dog breeds
                </NavLink>
            </li>
            <li>
                <NavLink exact activeClassName="active" to="/specificDogBreeds">
                    Search Dog Breed Info
                </NavLink>
            </li>
            {
            isLoggedIn && !isAdmin && (
                <li>
                    <NavLink activeClassName="active" to="/addDog">
                        Add dog
                    </NavLink>
                </li>
            )
        }
            {
            isLoggedIn && !isAdmin && (
                <li>
                    <NavLink activeClassName="active" to="/listOfDogs">
                        List dogs
                    </NavLink>
                </li>
            )
        }
            <li>
                <NavLink activeClassName="active" to="/login">
                    {loginMsg}
                    {" "} </NavLink>
            </li>

            {
            isAdmin && isLoggedIn && (
                <li>
                    <NavLink activeClassName="active" to="/calls">
                        Check overall calls
                    </NavLink>
                </li>
            )
        }
            {
            isAdmin && isLoggedIn && (
                <li>
                    <NavLink activeClassName="active" to="/specificCalls">
                        Check specific calls
                    </NavLink>
                </li>
            )
        } </ul>
    );
}

function Home() {
    return (
        <div>
            <h1>Welcome to the dog database!</h1>
            <div>This is the front-end of the 3rd semester exam project of Sebastian Steen Lundby Hansen.
            </div>
        </div>
    );
}

function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>
                No match for
                <code>{
                    location.pathname
                }</code>
            </h3>
        </div>
    );
}

export default App;
