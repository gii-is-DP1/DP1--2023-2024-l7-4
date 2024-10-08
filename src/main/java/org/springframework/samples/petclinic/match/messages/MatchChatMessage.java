package org.springframework.samples.petclinic.match.messages;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class MatchChatMessage {

    private String message;

    private Integer playerNumber;

    private Date date;

    private Integer matchId;
}
