import facade from "./apiFacade";
import React, {useState} from "react";

export default function SpecificDogBreed() {
    const [data, setData] = useState(null);
    const [breedName, setBreedName] = useState("");
    function handleChange(event) {
        const value = event.target.value;
        setBreedName(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setData(null);
        facade.breedInfo(breedName).then((res) => {
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
        <div>
            <img className={"dogImg"}
                alt="tomt"
                src={
                    data.image
            }></img>
            <h1>Breed: {
                data.breed
            }</h1>
            Img source: {
            data.image
        }
            <br/>
            Random dog fact: {
            data.facts
        }
            <br/>
            Breed info: {
            data.info
        }
            <br/>
            Wikipedia source: {
            data.wikipedia
        }</div>
    ) : ("");

    return <div>
        <form>
            <h2>Search specific breed</h2>
            <input placeholder="Breed name" id="breedName"
                value={breedName}
                onChange={handleChange}/>
            <button onClick={handleSubmit}>Search breed</button>
        </form>
        <div>{toShow}</div>
    </div>
}
