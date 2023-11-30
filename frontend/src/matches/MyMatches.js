import { Table, Button } from "reactstrap";
import tokenService from "../services/token.service";
import useFetchState from "../util/useFetchState";
import { useState } from "react";
import getIdFromUrl from "../util/getIdFromUrl";
import { Link } from "react-router-dom";

const imgnotfound = "https://cdn-icons-png.flaticon.com/512/5778/5778223.png";



export default function MyMatches() {
  const jwt = tokenService.getLocalAccessToken();
  const username = getIdFromUrl(2)
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [myMatches, setMyMatches] = useFetchState(
    [],
    `/api/v1/players/${username}/myMatches?closed=true`,
    jwt,
    setMessage,
    setVisible,
    username
    );

    const myMatchesList =
    myMatches.map((m) => {
    return (<tr key={m.id}>
        <td className="text-center"> {m.name} </td>
        <td className="text-center">{m.matchTime}</td>
        <td className="text-center"> {m.nrounds} </td>
        <td className="text-center">
        <Button outline color="success"> 
                <Link to={`/mymatches/${m.id}/view`} className="btn sm"                
                style={{ textDecoration: "none" }}>See</Link> 
        </Button> 
        </td>
        </tr>
        );
        });
        return (
        <div>
        <div className="admin-page-container">
        <h1 className="text-center">My Games</h1>
        <div>
        <Table aria-label="achievements" className="mt-4">
        <thead>
        <tr>
        <th className="text-center">name</th>
        <th className="text-center">Time</th>
        <th className="text-center">Rounds</th>
        <th className="text-center">Statistic</th>
        </tr>
        </thead>
        <tbody>{myMatchesList}</tbody>
        </Table>
        </div>
        </div>
        </div>
        );
    };

    