package org.springframework.samples.petclinic.match;

import java.util.List;

import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "matches")
public class Match extends BaseEntity {

    @Column
    private String name;

    @ElementCollection
    @CollectionTable(name = "joined_players", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "player")
    private List<String> joinedPlayers;

    @Column(name = "matchState")
    private MatchState matchState;

}
