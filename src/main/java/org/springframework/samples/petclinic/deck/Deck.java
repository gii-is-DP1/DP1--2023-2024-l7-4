package org.springframework.samples.petclinic.deck;

import java.util.Set;

import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Deck extends BaseEntity {

    private Set<Integer> cards;
    
    @OneToOne
    private Match match;
    
}
