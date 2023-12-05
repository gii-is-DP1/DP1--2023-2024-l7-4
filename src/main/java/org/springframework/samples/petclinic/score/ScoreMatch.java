package org.springframework.samples.petclinic.score;

import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "scores")
public class ScoreMatch extends BaseEntity{
    
    @Column(name = "totalScore")
    @NotNull
    private Integer totalScore;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "match", referencedColumnName = "id")
    private Match match;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Player player;
}
