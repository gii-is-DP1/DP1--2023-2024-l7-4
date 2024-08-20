package org.springframework.samples.petclinic.match.messages;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchMessage {
    
    TypeMessage type;

    String message;
    
}
