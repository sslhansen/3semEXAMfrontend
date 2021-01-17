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
        <div>{
            data.map((dog) => (
                <h3 key={
                    dog.id
                }>
                    <b>{
                        dog.id,
                        dog.name,
                        dog.dateOfBirth,
                        dog.info,
                        dog.breed
                    }</b>
                </h3>
            ))
        }</div>
    ) : ("Fetching dog list...");
    return (
        <div>{toShow}</div>
    );
}
