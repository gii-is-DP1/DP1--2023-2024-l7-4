package org.springframework.samples.petclinic.request;

import jakarta.validation.constraints.NotNull;

public class RequestDTO {

    @NotNull(message = "El nombre de usuario del primer jugador no puede ser nulo")
    private String playerOne;

    @NotNull(message = "El nombre de usuario del segundo jugador no puede ser nulo")
    private String playerTwo;

    @NotNull
    private String status;

    // Getters y setters

    public String getPlayerOne() {
        return playerOne;
    }

    public void setPlayerOne(String playerOne) {
        this.playerOne = playerOne;
    }

    public String getPlayerTwo() {
        return playerTwo;
    }

    public void setPlayerTwo(String playerTwo) {
        this.playerTwo = playerTwo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "RequestDTO{" +
                "playerOne='" + playerOne + '\'' +
                ", playerTwo='" + playerTwo + '\'' +
                '}';
    }
}
