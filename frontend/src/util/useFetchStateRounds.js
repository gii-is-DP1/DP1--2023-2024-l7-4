import { useEffect, useState } from "react";

export default function useFetchStateRounds(initial, url, jwt, setMessage, setVisible, obtained) {
    const [data, setData] = useState(initial);
    useEffect(() => {
        let intervalID = setInterval(() => {
            if (url) {
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
                                    setData(Array.of(json));
                                }
                            }
                        }).catch((message) => {
                            console.log(message);
                            setMessage('Failed to fetch data');
                            setVisible(true);
                        });        
            }
        }, 4000);
    
        if(obtained){
            clearInterval(intervalID);
        }

            return () => {
            clearInterval(intervalID);
                };
            }
    , [url, jwt, setMessage, setVisible, obtained]);
    return [data, setData];
}