package org.springframework.samples.petclinic.card;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.match.messages.MatchDeckMessage;
import org.springframework.samples.petclinic.match.messages.TypeMessage;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.samples.petclinic.card.CardUtils;
import org.springframework.samples.petclinic.configuration.services.NotificationService;

import jakarta.transaction.Transactional;

@Service
public class CardService {

    private NotificationService notificationService;

    @Autowired
    public CardService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Transactional
    public void executeCard1(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
            Integer matchId) {

        statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                : statePlayerMain.getPrecision() + 1);

        if (Math.random() < 0.5 && statePlayerMain.getBullets() >= 2) {
            statePlayerMain.setPreventDamage(true);
            statePlayerMain.setBullets(statePlayerMain.getBullets() - 2);
        }

    }

    @Transactional
    public void executeCard2(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
            Integer matchId) {

        if (Math.random() < 0.5) {
            statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                    : statePlayerMain.getPrecision() + 1);
        } else {
            statePlayerMain.setPrecision(statePlayerSecondary.getPrecision());
        }
        ;

        // DESCARTAR Y ROBAR CARTA

        List<Integer> updatedCards;

        updatedCards = statePlayerMain.getCards().stream().filter(c -> c != statePlayerMain.getCardPlayed())
                .collect(Collectors.toList());
        Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

        updatedCards.add(newCard);
        statePlayerMain.setCards(updatedCards);

    }

    @Transactional
    public void executeCard3(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
            Integer matchId) {

        statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                : CardUtils.limit(statePlayerMain.getPrecision() + 2));

        // DESCARTAR CARTA

        List<Integer> updatedCards;
        updatedCards = statePlayerMain.getCards().stream().filter(c -> c != statePlayerMain.getCardPlayed())
                .collect(Collectors.toList());

        statePlayerMain.setCards(updatedCards);

        MatchDeckMessage message = new MatchDeckMessage(TypeMessage.CHOOSE, deckOfCards, List.of(), List.of(),
                statePlayerMain.getPlayerNumber() == 0 ? statePlayerMain.getCardPlayed() : -1,
                statePlayerMain.getPlayerNumber() == 1 ? statePlayerMain.getCardPlayed() : -1);

        notificationService.sendMessage("topic/match/" + matchId + "/cards", message);

    }

    @Transactional
    public void executeCard4(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
            Integer matchId) {

        statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() - 1));

        statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                : CardUtils.limit(statePlayerMain.getPrecision() + 3));

        statePlayerMain.setPrecisionChange(false);

        // DESCARTAR CARTA

        List<Integer> updatedCards;
        updatedCards = statePlayerMain.getCards().stream().filter(c -> c != statePlayerMain.getCardPlayed())
                .collect(Collectors.toList());

        statePlayerMain.setCards(updatedCards);

        // ENVIAR MENSAJE PARA ELEGIR ENTRE 3

        MatchDeckMessage message = new MatchDeckMessage(TypeMessage.CHOOSE, deckOfCards, List.of(), List.of(),
                statePlayerMain.getPlayerNumber() == 0 ? statePlayerMain.getCardPlayed() : -1,
                statePlayerMain.getPlayerNumber() == 1 ? statePlayerMain.getCardPlayed() : -1);

        notificationService.sendMessage("topic/match/" + matchId + "/cards", message);

    }

    @Transactional
    public void executeCard5(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
            Integer matchId) {

        statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                : CardUtils.limit(statePlayerMain.getPrecision() + 2));

        if ((statePlayerSecondary.getCardPlayedBefore() >= 19 && statePlayerSecondary.getCardPlayedBefore() <= 27)
                || List.of(47, 50).contains(statePlayerSecondary.getCardPlayedBefore())) {

            statePlayerMain.setBullets(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                    : CardUtils.limit(statePlayerMain.getPrecision() + 2));

        }

    }

}
