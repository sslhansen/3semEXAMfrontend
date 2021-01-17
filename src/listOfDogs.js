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
        <div>
            <h1>Dine hunde:</h1>
            {
            data.map((dog) => (
                <h2 key={
                    dog.id
                }>
                    <h2>{
                        "Navn:  " + dog.name + "  Fødselsdato:  " + dog.dateOfBirth + "  Info om din hund:  " + dog.info + "  Race:  " + dog.breed
                    } </h2>
                </h2>
            ))
        }</div>
    ) : ("Fetching dog list...");
    return (
        <div>{toShow}</div>
    );
}
