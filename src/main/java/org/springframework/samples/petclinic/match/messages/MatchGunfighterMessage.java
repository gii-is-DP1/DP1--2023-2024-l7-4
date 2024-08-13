package org.springframework.samples.petclinic.match.messages;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchGunfighterMessage {
    
    private TypeMessage type;
    private Integer health;
    private Integer bullets;
    private Integer precision;
    private Integer playerNumber;

}
