package org.springframework.samples.petclinic.territory;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties
@Getter
@Setter
public class TerritoryDTO {
    
    private Integer q;

    private Integer r;

    private Integer s;

    private String text;

    public TerritoryDTO(){
    }

    public TerritoryDTO(Integer q, Integer r, Integer s, String text){
        this.q = q;
        this.r = r;
        this.s = s;
        this.text = text;
    }

    public Territory transform(Cell cell){
        Territory terr = new Territory();
        terr.setTerritoryType(TerritoryType.valueOf(text));
        terr.setCell(cell);
        return terr;
    }

}
