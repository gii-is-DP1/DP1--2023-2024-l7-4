package org.springframework.samples.petclinic.player;

import org.springframework.samples.petclinic.userKingdom.UserKingdom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
}