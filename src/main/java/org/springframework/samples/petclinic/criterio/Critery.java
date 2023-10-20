package org.springframework.samples.petclinic.criterio;

import org.springframework.samples.petclinic.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "criteria")
public class Critery extends BaseEntity{
    

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

}
