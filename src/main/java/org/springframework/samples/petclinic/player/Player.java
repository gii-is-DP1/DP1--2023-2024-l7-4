package org.springframework.samples.petclinic.player;

import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.userKingdom.UserKingdom;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter; 

@Entity
@Getter
@Setter
@Table(name = "players")
public class Player extends UserKingdom{

	@Column(name = "total_puntuation")
    Integer total_puntuation;

    @Column(name = "total_bloqs")
	Integer total_blo;

    @ManyToOne
    @JoinColumn(name = "match", referencedColumnName = "id")
    private Match match;

    
}