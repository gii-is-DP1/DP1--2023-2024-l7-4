package org.springframework.samples.petclinic.gunfighter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Gunfighter {
    
    private Integer health;
    private Integer bullets;
    private boolean bulletsChange;
    private Integer precision;
    private Integer precisionBefore;
    private Boolean precisionChange;
    private Integer winPrecision;
    private List<Integer> cards;
    private Integer cardPlayed;
    private Integer cardPlayedBefore;
    private boolean preventDamage;
    private Integer failing;
    private Boolean recievex2damage;
    private Boolean intimidationCardInHand;
    private Integer playerNumber;
    private Boolean doubleCard;

}
