package org.springframework.samples.petclinic.gameRequests;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class GameRequest extends BaseEntity {

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    GameRequestStatus status;

    @ManyToOne(optional = false)
    Player playerOne;

    @ManyToOne(optional = false)
    @NotNull
    Player playerTwo;

    Integer matchId;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    GameRequestType type = GameRequestType.PLAYER;

}
