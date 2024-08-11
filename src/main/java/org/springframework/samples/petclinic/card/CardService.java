package org.springframework.samples.petclinic.card;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class CardService {
    

    @Transactional
    public void executeCard1(Gunfighter statePlayerMain, Gunfighter statePlayerSecondary) {

        statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision() : statePlayerMain.getPrecision() + 1);
       
      
        if (Math.random() < 0.5 && statePlayerMain.getBullets() >= 2) {
            statePlayerMain.setPreventDamage(true);
            statePlayerMain.setBullets(statePlayerMain.getBullets() - 2);
        }
      
    }

    @Transactional
    public void executeCard2(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary) {

        if (Math.random() < 0.5) {
            statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision() : statePlayerMain.getPrecision() + 1);
        } 
        else {
          statePlayerMain.setPrecision(statePlayerSecondary.getPrecision());
          };

      //DESCARTAR Y ROBAR CARTA

        List<Integer> updatedCards;

        updatedCards = statePlayerMain.getCards().stream().filter(c ->  c != statePlayerMain.getCardPlayed()).collect(Collectors.toList());
        Integer newCard = deckOfCards.remove(deckOfCards.size() -1);

        updatedCards.add(newCard);
        statePlayerMain.setCards(updatedCards);
          
    }

    
}
