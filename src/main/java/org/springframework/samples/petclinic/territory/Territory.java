package org.springframework.samples.petclinic.territory;

import org.springframework.samples.petclinic.model.BaseEntity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "territories")
public class Territory extends BaseEntity{
    
    @Column(name = "posX")
    Integer posX;

    @Column(name = "posY")
    Integer posY;

    @Column(name = "posZ")
    Integer posZ;

    @Column(name = "type")
    @NotNull
    TerritoryType territoryType;


}
