import {
    Table
    } from "reactstrap";
    import tokenService from "../services/token.service";
    import useFetchState from "../util/useFetchState";
    const imgnotfound = "https://cdn-icons-png.flaticon.com/512/5778/5778223.png";
    const jwt = tokenService.getLocalAccessToken();
    export default function AchievementList() {
    const [mygames, setMyGames] = useFetchState(
    [],
    `/api/v1/mygames`,
    jwt
    );
    const myGamesList =
    mygames.map((a) => {
    return (<tr key={a.id}>
        <td className="text-center">{a.matchTime}</td>
        <td className="text-center"> {a.nRounds} </td>
        <td className="text-center"> {a.scoreCrit} </td>
        <td className="text-center"> {a.winner} </td>
        <td className="text-center"> {a.joinedPlayers} </td>
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
        </tr>
        </thead>
        <tbody>{myGamesList}</tbody>
        </Table>
        </div>
        </div>
        </div>
        );
    }