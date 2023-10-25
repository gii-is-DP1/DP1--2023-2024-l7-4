import {
    Table, Button
    } from "reactstrap";
    import tokenService from "../services/token.service";
    import { Link } from "react-router-dom"; 
    import useFetchState from "../util/useFetchState";
    const imgnotfound = "https://cdn-icons-png.flaticon.com/512/5778/5778223.png";
    const jwt = tokenService.getLocalAccessToken();
    export default function myGamesList() {
    const mygames =[{id:1,matchTime:30,nRounds:5,scoreCrit:["carta","hola"],winner:"alvaro",joinedPlayers:["hola","xd"]},
    {id:2,matchTime:30,nRounds:5,scoreCrit:["carta","hola"],winner:"alvaro",joinedPlayers:["hola","xd"]},
    {id:3,matchTime:30,nRounds:5,scoreCrit:["carta","hola"],winner:"alvaro",joinedPlayers:["hola","xd"]}

    ]
    const myGamesList =
    mygames.map((a) => {
    return (<tr key={a.id}>
        <td className="text-center">{a.matchTime}</td>
        <td className="text-center"> {a.nRounds} </td>
        <td className="text-center"> {a.scoreCrit} </td>
        <td className="text-center"> {a.winner} </td>
        <td className="text-center"> {a.joinedPlayers} </td>
        <td className="text-center">    
        <Button outline color="success"> 
          <Link 
            to={`/mygames/view`}   className="btn sm"                
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
        <th className="text-center">Duration</th>
        <th className="text-center">Rounds</th>
        <th className="text-center">ScoreCrit</th>
        <th className="text-center">Winner</th>
        <th className="text-center">Players</th>
        <th className="text-center">Statistic</th>
        </tr>
        </thead>
        <tbody>{myGamesList}</tbody>
        </Table>
        </div>
        </div>
        </div>
        
        );
    };

    