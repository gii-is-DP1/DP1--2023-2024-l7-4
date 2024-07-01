package org.springframework.samples.petclinic.match;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class MatchDeckMessage {
    
    private TypeMessage type;

    private List<Integer> deckCards;    

    private List<Integer> player0Cards;    

    private List<Integer> player1Cards;    

    private Integer playedCard0;

    private Integer playedCard1;
}
