package org.springframework.samples.petclinic.gunfighter;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Gunfighter {
    
    private Integer health;
    private Integer precision;
    private Integer bullets;
    private Integer winPrecision;
    private boolean preventDamage;
    private List<Integer> cards;
    private Integer cardPlayed;

}
