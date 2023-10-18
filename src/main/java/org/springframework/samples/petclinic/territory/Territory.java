package org.springframework.samples.petclinic.territory;

import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "players")
public class Territory extends BaseEntity{
    
    @Column(name = "terrType")
    @NotNull
    TerritoryType terrType;

    @Column(name = "position")
    @NotNull
    @Max(61)
    Integer numberCell;
    
    @OneToMany
    @NotNull
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Player player;

    @OneToMany
    @NotNull
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match match;


}
