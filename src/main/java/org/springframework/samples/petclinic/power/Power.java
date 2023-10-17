package org.springframework.samples.petclinic.power;

import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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

    @OneToMany
    @NotNull
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Player player;

    @OneToMany
    @NotNull
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match match;

   
}
