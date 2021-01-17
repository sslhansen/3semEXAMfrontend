import facade from "./apiFacade";
import React, {useState, useEffect} from "react";

export default function ListOfDogs() {
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(null);
        facade.dogsByUser(localStorage.getItem("username")).then((res) => setData(res)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }, []);

    const toShow = data ? (
        <div> {
            data.map((dog) => (
                <div key={
                    dog.id
                }>
                    <h4>Name: {
                        dog.name
                    }</h4>
                    {
                    "Date of Birth:  " + dog.dateOfBirth + " Info on your dog:  " + dog.info + "  Breed:  " + dog.breed
                } </div>
            ))
        }</div>
    ) : ("Fetching dog list...");
    return (
        <div>
            <h1>Your dogs!
            </h1>
            {toShow}</div>
    );
}
