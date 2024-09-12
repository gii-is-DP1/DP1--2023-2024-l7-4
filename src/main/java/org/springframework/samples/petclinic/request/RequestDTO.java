package org.springframework.samples.petclinic.request;

import jakarta.validation.constraints.NotNull;

public class RequestDTO {

    @NotNull(message = "El nombre de usuario del primer jugador no puede ser nulo")
    private String playerOneUsername;

    @NotNull(message = "El nombre de usuario del segundo jugador no puede ser nulo")
    private String playerTwoUsername;

    // Getters y setters

    public String getPlayerOneUsername() {
        return playerOneUsername;
    }

    public void setPlayerOneUsername(String playerOneUsername) {
        this.playerOneUsername = playerOneUsername;
    }

    public String getPlayerTwoUsername() {
        return playerTwoUsername;
    }

    public void setPlayerTwoUsername(String playerTwoUsername) {
        this.playerTwoUsername = playerTwoUsername;
    }

    @Override
    public String toString() {
        return "RequestDTO{" +
                "playerOneUsername='" + playerOneUsername + '\'' +
                ", playerTwoUsername='" + playerTwoUsername + '\'' +
                '}';
    }
}
