import React, { useEffect, useState } from 'react';
import { Form, Input, Label, FormGroup } from 'reactstrap';
import tokenService from "../../services/token.service"; 
import getIdFromUrl from '../../util/getIdFromUrl';
import { Link } from "react-router-dom";

const jwt = tokenService.getLocalAccessToken();

export default function PlayerDetails() {
    const username = getIdFromUrl(2);
    const [playerDetails, setPlayerDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) {
            setError("Invalid player username");
            return;
        }

        fetch(`/api/v1/players/public/${username}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                Accept: "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setPlayerDetails(data))
            .catch(error => setError(error.message));
    }, [username]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!playerDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="auth-page-container3">
            <div className="hero-div">
                <h1>{playerDetails.nickname || "Player"}</h1>
                <Form className='western-form-container2'>
                    <div className="main-info">
                        <FormGroup>
                            {playerDetails.avatar && (
                                <img
                                    src={playerDetails.avatar}
                                    alt="Player Avatar"
                                    style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                                />
                            )}
                        </FormGroup>
                        {playerDetails.biography && (
                            <FormGroup>
                                <Label for="biography">Biography</Label>
                                <Input type="textarea" name="biography" id="biography" value={playerDetails.biography} readOnly />
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input type="text" name="location" id="location" value={playerDetails.location || ""} readOnly />
                        </FormGroup>
                        {playerDetails.birthdate && (
                            <FormGroup>
                                <Label for="birthdate">Birthdate</Label>
                                <Input type="date" name="birthdate" id="birthdate" value={playerDetails.birthdate} readOnly />
                            </FormGroup>
                        )}
                        {playerDetails.favoriteGenres && (
                            <FormGroup>
                                <Label for="favoriteGenres">Favorite Genres</Label>
                                <Input type="text" name="favoriteGenres" id="favoriteGenres" value={playerDetails.favoriteGenres} readOnly />
                            </FormGroup>
                        )}
                        {playerDetails.favoritePlatforms && (
                            <FormGroup>
                                <Label for="favoritePlatforms">Favorite Platforms</Label>
                                <Input type="text" name="favoritePlatforms" id="favoritePlatforms" value={playerDetails.favoritePlatforms} readOnly />
                            </FormGroup>
                        )}
                        {playerDetails.favoriteSagas && (
                            <FormGroup>
                                <Label for="favoriteSagas">Favorite Sagas</Label>
                                <Input type="text" name="favoriteSagas" id="favoriteSagas" value={playerDetails.favoriteSagas} readOnly />
                            </FormGroup>
                        )}
                    </div>
                    <div className="custom-button-row">
                        <Link 
                            to={`/players/${username}/statistics`}
                            className="button-container">Statistics
                        </Link>
                        <Link
                            to={`/players`}
                            className="button-container-bad">Back
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}
