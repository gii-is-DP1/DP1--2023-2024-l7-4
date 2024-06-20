package org.springframework.samples.petclinic.match;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class MatchDeckMessage {
    
    private TypeMessage type;

    private List<Integer> cards;    
}
