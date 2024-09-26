package org.springframework.samples.petclinic.request;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "player_one_id", "player_two_id", "status" }))
public class Request extends BaseEntity {

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    RequestState status;

    @ManyToOne(optional = false)
    Player playerOne;

    @ManyToOne(optional = false)
    Player playerTwo;

}
