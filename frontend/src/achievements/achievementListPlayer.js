import { useState } from "react";
import { Table } from "reactstrap";
import tokenService from "../services/token.service";
import useFetchState from "../util/useFetchState";
import jwtDecode from "jwt-decode";


const imgnotfound = "https://cdn-icons-png.flaticon.com/512/5778/5778223.png";
const jwt = tokenService.getLocalAccessToken();


export default function AchievementList() {
    const username = jwtDecode(jwt).sub;
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [achievementsReached, setAchievementsReached] = useFetchState(
    [],
    `/api/v1/achievements/player/${username}?reached=true`,
    jwt,
    setMessage,
    setVisible,
    username    
    );
    const [achievementsNotReached, setAchievementsNotReached] = useFetchState(
        [],
        `/api/v1/achievements/player/${username}?reached=false`,
        jwt,
        setMessage,
        setVisible,
        username    
        );


    const achievementReachedList = achievementsReached.map((a) => {
        return (<tr key={a.id}>
            <td className="text-center">{a.name}</td>
            <td className="text-center"> {a.description} </td>
            <td className="text-center">
                <img src={a.badgeImage ? a.badgeImage : imgnotfound } alt={a.name} width="50px"/>
            </td>
            <td className="text-center"> {a.threshold} </td>
            <td className="text-center"> {a.metric} </td>
            </tr>
            );
        });
    
        
    const achievementNotReachedList = achievementsNotReached.map((a) => {
        return (<tr key={a.id}>
            <td className="text-center">{a.name}</td>
            <td className="text-center"> {a.description} </td>
            <td className="text-center">
                <img src={a.badgeImage ? a.badgeImage : imgnotfound } alt={a.name} width="50px"/>
            </td>
            <td className="text-center"> {a.threshold} </td>
            <td className="text-center"> {a.metric} </td>
            </tr>
            );
        });
    
    return (
        <div>
        <div className="admin-page-container">
        <h1 className="text-center">Achievements Reached</h1>
        <div>
        <Table aria-label="achievements Reached" className="mt-4">
        <thead>
        <tr>
        <th className="text-center">Name</th>
        <th className="text-center">Description</th>
        <th className="text-center">Image</th>
        <th className="text-center">Threshold</th>
        <th className="text-center">Metric</th>
        </tr>
        </thead>
        <tbody>{achievementReachedList}</tbody>
        </Table>
        </div>
        <h1 className="text-center">Achievements Not Reached</h1>
        <div>
        <Table aria-label="achievements Not Reached" className="mt-4">
        <thead>
        <tr>
        <th className="text-center">Name</th>
        <th className="text-center">Description</th>
        <th className="text-center">Image</th>
        <th className="text-center">Threshold</th>
        <th className="text-center">Metric</th>
        </tr>
        </thead>
        <tbody>{achievementNotReachedList}</tbody>
        </Table>
        </div>
        </div>
        </div>
    );
}