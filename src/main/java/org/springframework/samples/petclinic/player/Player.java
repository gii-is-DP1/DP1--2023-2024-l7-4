package org.springframework.samples.petclinic.player;

import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.userKingdom.UserKingdom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match joinedMatch;

    @OneToMany
    @JoinColumn(name = "matches", referencedColumnName = "id")
    private Match createdMatch;

    @OneToMany
    @JoinColumn(name = "power", referencedColumnName = "id")
    private Power power;

    @OneToMany
    @JoinColumn(name="territory", referencedColumnName = "id")
    private Territory territory;

    @OneToMany
    @JoinColumn(name = "scoreMatch", referencedColumnName = "id")
    private ScoreMatch scoreMatch;
}