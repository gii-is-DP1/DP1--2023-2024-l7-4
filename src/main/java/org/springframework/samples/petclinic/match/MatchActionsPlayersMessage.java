package org.springframework.samples.petclinic.match;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchActionsPlayersMessage {
 
    private MatchActionsPlayersMessage action;
    private Integer playerNumber;
}
