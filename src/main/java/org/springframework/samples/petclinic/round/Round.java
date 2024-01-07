package org.springframework.samples.petclinic.round;

import java.util.List;

import org.springframework.samples.petclinic.match.Match;
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
public class Round extends BaseEntity{

    @ManyToOne
    @NotNull
    @JoinColumn(name = "match", referencedColumnName = "id")
    private Match match;


    @Column(name = "mainPlayer")
    @NotNull
    private String mainPlayer;


    @Column(name = "dices")
    @NotNull
    private List<Integer> dices;

}
