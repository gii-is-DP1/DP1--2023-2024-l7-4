package org.springframework.samples.petclinic.criterio;

import com.fasterxml.jackson.databind.deser.DataFormatReaders.Match;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "criteria")
public class Critery {
    

    @Column(name = "victoryPoints")
    @NotEmpty 
    Integer victoryPoints;

    
	@Column(name = "description")
    @NotEmpty
    String description;

    
	@Column(name = "identificativeGroup")
    @NotEmpty
    String identificativeGroup;

    @Column(name = "number")
    @NotEmpty
    Integer number;

    @ManyToOne
	@JoinColumn(name = "matches", referencedColumnName = "id")
    private Match matches;

}
