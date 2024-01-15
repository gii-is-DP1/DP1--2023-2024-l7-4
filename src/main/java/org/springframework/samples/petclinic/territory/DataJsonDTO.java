package org.springframework.samples.petclinic.territory;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties
public class DataJsonDTO {
    
    private Set<TerritoryDTO> hexagons;

    public DataJsonDTO(){
    };

    public DataJsonDTO(Set<TerritoryDTO> territories){
        this.hexagons = territories;
    }


}
