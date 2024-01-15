import { useEffect, useState } from "react";

export default function useFetchStateMatches(initial, url, jwt, setMessage, setVisible) {
    const [data, setData] = useState(initial);
    useEffect(() => {
        let intervalID = setInterval(() => {
            if (url) {
                if (jwt) {
                    let ignore = false;
                    fetch(url, {
                        headers: {
                            "Authorization": `Bearer ${jwt}`,
                        },
                    })
                        .then(response => response.json())
                        .then(json => {
                            if (!ignore) {
                                if (json.message) {
                                    setMessage(json.message);
                                    setVisible(true);
                                }
                                else {
                                    setData(json);
                                }
                            }
                        }).catch((message) => {
                            console.log(message);
                            setMessage('Failed to fetch data');
                            setVisible(true);
                        });        
                }
            }
        }, 3500);
            return () => {
            clearInterval(intervalID);
                };
            }
    , [url, jwt, setMessage, setVisible]);
    return [data, setData];
}