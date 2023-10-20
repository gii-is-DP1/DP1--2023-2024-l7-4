package org.springframework.samples.petclinic.round;

import java.util.Set;

import org.springframework.samples.petclinic.matches.Match;
import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "rounds")
public class Round extends BaseEntity {
     
	@Column(name = "activePlayer")
    @NotNull
    String activePlayer;

    @Column(name = "dices")
    @NotNull
    Set<Integer> dices;

    @ManyToOne
	@JoinColumn(name = "match", referencedColumnName = "id")
    private Match match;
}
