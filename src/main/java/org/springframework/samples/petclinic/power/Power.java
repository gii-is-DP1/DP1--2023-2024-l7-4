package org.springframework.samples.petclinic.power;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "power")
public class Power extends BaseEntity{
    
    @Column(name = "PowerType")
    private PowerType powerType;

    @Column(name = "isUsed")
    private Boolean isUsed;

    @Column(name = "Description")
    private String description;

    @ManyToOne
    @NotNull
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "player", referencedColumnName = "id")
    private  Player  player;

    @ManyToOne
    @NotNull
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "match", referencedColumnName = "id")
    private Match match;

   
}
