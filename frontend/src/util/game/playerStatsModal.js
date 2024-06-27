import React from 'react';
import { FaHeart, FaCrosshairs } from 'react-icons/fa';
import { GiHeavyBullets } from 'react-icons/gi';

const PlayerStats = ({ health, bullets, precision }) => {
    return (
        <div className="player-stats">
            <div className="stat-pair">
                <FaHeart /> : {health}
            </div>
            <div className="stat-pair">
                <GiHeavyBullets /> : {bullets}
            </div>
            <div className="stat-pair">
                <FaCrosshairs /> : {precision}
            </div>
        </div>
    );
};

export default PlayerStats;
