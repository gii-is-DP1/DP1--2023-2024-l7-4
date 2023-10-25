package org.springframework.samples.petclinic.matches;

import java.util.List;
import java.util.Set;

import org.springframework.samples.petclinic.model.BaseEntity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

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

    @Column(name = "joinedPlayers")
    @JsonIgnore
    @NotEmpty
    private Set<Player> joinedPlayers;


    @ManyToOne
    @NotNull
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Player creator;


}
