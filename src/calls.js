import facade from "./apiFacade";
import React, {useState, useEffect} from "react";

export default function Calls() {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(null);
        facade.getCalls().then((res) => setData(res)).catch((err) => {
            if (err.status) {
                console.log(err.message);
            }
        });
    }, []);

    const toShow = data ? (
        <h2>{data.searches}</h2>
    ) : ("Fetching calls..");

    return <div>Total calls made for breeds: {toShow} </div>
}
