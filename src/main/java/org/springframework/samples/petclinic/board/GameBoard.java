package org.springframework.samples.petclinic.board;

import java.util.Set;

import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.territory.Territory;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "gameBoards")
public class GameBoard extends BaseEntity{
    
    @OneToMany
    @JoinColumn(name = "territories", referencedColumnName = "id")
    private Set<Territory> territories;

    @ManyToOne
    @JoinColumn(name = "playerBoard")
    private Player player;

    @OneToOne
    @JoinColumn(name = "match")
    private Match match;

}
