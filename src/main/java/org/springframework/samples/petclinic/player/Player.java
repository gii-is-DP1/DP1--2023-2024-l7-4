package org.springframework.samples.petclinic.player;

import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.matches.ScoreMatch;
import org.springframework.samples.petclinic.power.Power;
import org.springframework.samples.petclinic.territory.Territory;
import org.springframework.samples.petclinic.userKingdom.UserKingdom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "players")
public class Player extends UserKingdom{

	@Column(name = "puntuacion_total")
    Integer puntuacion_total;

    @Column(name = "bloques_totales")
	Integer bloques_totales;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match joinedMatch;

    @OneToMany
    @NotNull
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match createdMatch;

    @OneToMany
    @NotNull
    @JoinColumn(name = "power", referencedColumnName = "id")
    private Power power;

    @OneToMany
    @NotNull
    @JoinColumn(name="territory", referencedColumnName = "id")
    private Territory territory;

    @OneToMany
    @NotNull
    @JoinColumn(name = "scoreMatch", referencedColumnName = "id")
    private ScoreMatch scoreMatch;
}