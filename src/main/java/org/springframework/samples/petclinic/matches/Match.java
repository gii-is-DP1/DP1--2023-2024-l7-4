package org.springframework.samples.petclinic.matches;

import java.util.List;

import org.springframework.samples.petclinic.criterio.Critery;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.power.Power;
import org.springframework.samples.petclinic.round.Round;
import org.springframework.samples.petclinic.territory.Territory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="matches")
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


     
    @OneToMany
    @Max(4)
    @Min(1)
    @NotNull
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Player player;

    @OneToMany
    @Max(6)
    @Min(1)
    @NotNull
    @JoinColumn(name = "critery")
    private Critery critery;

    @OneToMany
    @Max(7)
    @NotNull
    @JoinColumn(name = "power", referencedColumnName = "id")
    private Power power;

    @OneToMany
    @Min(1)
    @NotNull
    @JoinColumn(name = "round", referencedColumnName = "id")
    private Round round;

    @OneToMany
    @Max(61)
    @NotNull
    @JoinColumn(name ="territory", referencedColumnName = "id")
    private Territory territory;
    


}
