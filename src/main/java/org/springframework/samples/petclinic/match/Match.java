package org.springframework.samples.petclinic.match;

import java.util.List;
import java.util.Set;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "matches")
public class Match extends BaseEntity{
        
    @Column(name = "matchTime")
    @NotEmpty
    @NotNull
    private Integer matchTime;

    @Column(name = "nRounds")
    @NotEmpty
    @NotNull
    private Integer nRounds;

    @Column(name = "scoreCrit")
    @NotEmpty
    private List<String> scoreCrit;

    @Column(name = "winner")
    @NotEmpty
    @NotNull
    private String winner;

//PROPIEDAD DONDE SE GUARDAN LOS DISTINTOS USERNAMES DE LOS JUGADORES,
//PARA PODER LUEGO EXTRAER LOS DATOS NECESARIOS DE LOS JUGADORES
    @Column(name = "joinedPlayers")
    private Set<String> joinedPlayers;

    @Column(name = "matchState")
    @JsonIgnore
    @NotEmpty
    private MatchState matchState;



}
