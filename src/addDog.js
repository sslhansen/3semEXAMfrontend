import facade from "./apiFacade";
import React, {useState, useEffect} from "react";


export default function AddDog() {
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [info, setInfo] = useState("");
    const [breed, setBreed] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleNameChange(event) {
        const value = event.target.value;
        setName(value);
    }

    function handleDateOfBirthChange(event) {
        const value = event.target.value;
        setDateOfBirth(value);
    }

    function handleInfoChange(event) {
        const value = event.target.value;
        setInfo(value);
    }

    function handleBreedChange(event) {
        const value = event.target.value;
        setBreed(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setData(null);
        console.log(localStorage.getItem("username"), name, dateOfBirth, info, breed)
        facade.addDog(localStorage.getItem("username"), name, dateOfBirth, info, breed).then((res) => setData(res)).then().catch((err) => {
            if (err.status) {
                console.log(err.message);
                setErrorMessage(err.message);                
            }
        });
    }

    const toShow = data ? (
        <div>{data.msg}</div>
    ) : ("");

    const errorMsg = errorMessage ? (
        <div>{errorMessage}</div>
    ) : ("");

    return <div>
        <div>
            <form>
                <h2>Movie Search</h2>
                <input placeholder="Dog name" id="name"
                    onChange={handleNameChange}/>
                <input placeholder="Dog date of birth" id="dateOfBirth" onChange={handleDateOfBirthChange}/>
                <input placeholder="Dog info" id="info" onChange={handleInfoChange}/>
                <input placeholder="Dog breed" id="breed" onChange={handleBreedChange}/>
                <button onClick={handleSubmit}>Add doggie</button>
            </form>
        </div>
        <div>{toShow}{errorMsg}</div>
    </div>
}
