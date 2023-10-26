package org.springframework.samples.petclinic.territory;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.territory.Position;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
    TerritoryType territoryType;


}
