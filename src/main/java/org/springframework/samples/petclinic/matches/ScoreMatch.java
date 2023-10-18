package org.springframework.samples.petclinic.matches;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="scoreMatches")
public class ScoreMatch extends BaseEntity{
    
    @Column(name = "score")
    @NotNull
    Integer score;

    @Column(name = "totalBuildings")
    @NotNull
    Integer totalBuildings;

    @OneToMany
    @NotNull
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Player player;

    @OneToMany
    @NotNull
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match match;
}
