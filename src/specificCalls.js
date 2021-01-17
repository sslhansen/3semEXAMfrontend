import facade from "./apiFacade";
import React, {useState, useEffect} from "react";

export default function SpecificCalls() {
    const [data, setData] = useState(null);
    const [breedName, setBreedName] = useState("");

    function handleChange(event) {
        const value = event.target.value;
        setBreedName(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setData(null);
        facade.getSpecificCalls(breedName).then((res) => {
            if (!(res.msg === "Missing dog information!") && !(res.msg === "Hello World")) {
                setData(res)
            } else {
                console.log("Missing dog information!")
            }
        }).then().catch((err) => {
            if (err.status) {
                console.log(err.message);
                setData(null);
            }
        });
    }

    const toShow = data ? (
        <h2>Amount of searches: {
            data.searches
        }</h2>
    ) : ("");

    return <div>
        <form>
            <h2>Search for amount of breed calls:</h2>
            <input placeholder="Breed name" id="breedName"
                value={breedName}
                onChange={handleChange}/>
            <button onClick={handleSubmit}>Search breed</button>
        </form>
        <div>{toShow}</div>
    </div>
}
