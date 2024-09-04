import React, { useRef } from 'react';

const ButtonWithSound = ({ buttonText, onClick }) => {
    const hoverAudioRef = useRef(null);
    const clickAudioRef = useRef(null);

    const playHoverSound = () => {
        if (hoverAudioRef.current) {
            hoverAudioRef.current.currentTime = 0;
            hoverAudioRef.current.play();
        }
    };

    const playSoundAndClick = (event) => {
        event.preventDefault();

        if (clickAudioRef.current) {
            clickAudioRef.current.currentTime = 0;
            clickAudioRef.current.play();
        }

        onClick && onClick();
    };

    return (
        <div>
            <audio ref={hoverAudioRef} src={`${process.env.PUBLIC_URL}/revolver-hover-sound.mp3`} />
            <audio ref={clickAudioRef} src={`${process.env.PUBLIC_URL}/revolver-click-sound.mp3`} />
            
            <button
                className="button-container"
                onMouseEnter={playHoverSound}
                onClick={playSoundAndClick}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default ButtonWithSound;
