package org.springframework.samples.petclinic.round;

import org.springframework.samples.petclinic.matches.Match;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "rounds")
public class Round {
     

	@Column(name = "activePlayer")
    @NotNull
    String activePlayer;
  
    @ManyToOne
	@JoinColumn(name = "matches", referencedColumnName = "id")
    private Match matches;
}
