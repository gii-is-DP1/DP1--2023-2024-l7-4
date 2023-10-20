package org.springframework.samples.petclinic.matches;

import java.util.List;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.samples.petclinic.criterio.Critery;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.power.Power;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    @NotNull
    @JoinColumn(name = "player", referencedColumnName = "id")
    private Player creator;

    @OneToMany(mappedBy = "match", orphanRemoval = true)
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<Player> joinedPlayers;

    @OneToMany
    @Max(6)
    @Min(1)
    @NotNull
    @JoinColumn(name = "critery", referencedColumnName = "id")
    private List<Critery> criteria;

    @OneToMany
    @Max(7)
    @NotNull
    @JoinColumn(name = "power", referencedColumnName = "id")
    private List<Power> powers;

}
