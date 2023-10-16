package org.springframework.samples.petclinic.power;

import org.springframework.samples.petclinic.matches.Match;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;

@Entity
@Table(name = "power")
public class Power {
    
    @Column(name = "PowerType")
    private PowerType powerType;

    @Column(name = "isUsed")
    private Boolean isUsed;

    @Column(name = "Description")
    private String description;

    @OneToMany
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Power power;

    @OneToMany
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match match;

   
}
