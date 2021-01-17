import facade from "./apiFacade";
import React, {useState, useEffect} from "react";
export default function DogBreeds() {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(null);
        facade.dogBreeds().then((res) => setData(res)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }, []);

    const toShow = data ? (
        <div>{
            data.map((dog) => (

                <h2>{dog.breed}</h2> 

            ))
        }</div>
    ) : ("Fetching dog list...");
    return (
        <div><h1>List of different breeds:</h1> {toShow}</div>
    );
}
