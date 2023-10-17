package org.springframework.samples.petclinic.territory;

import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.power.Power;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "players")
public class Territory {
    
    @Column(name = "terrType")
    TerritoryType terrType;

    @Column(name = "position")
    @Max(61)
    Integer numberCell;
    
    @OneToMany
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Power power;

    @OneToMany
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match match;


}
