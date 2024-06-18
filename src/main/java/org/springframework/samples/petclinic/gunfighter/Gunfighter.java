package org.springframework.samples.petclinic.gunfighter;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Gunfighter {
    
    private Integer health;
    private Integer precision;
    private Integer bullets;

}
