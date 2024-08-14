package org.springframework.samples.petclinic.card;

import java.util.ArrayList;
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
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
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

                // MANDAR ELEGIR 3 CARTAS

                MatchDeckMessage message = new MatchDeckMessage(TypeMessage.CHOOSE, deckOfCards, List.of(), List.of(),
                                statePlayerMain.getPlayerNumber() == 0 ? statePlayerMain.getCardPlayed() : -1,
                                statePlayerMain.getPlayerNumber() == 1 ? statePlayerMain.getCardPlayed() : -1);

                notificationService.sendMessage("topic/match/" + matchId + "/cards", message);

        }

        @Transactional
        public void executeCard4(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
                        Integer matchId) {
                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() - 1));

                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 3));

                        statePlayerMain.setPrecisionChange(false);

                }
        }

        @Transactional
        public void executeCard5(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                : CardUtils.limit(statePlayerMain.getPrecision() + 2));

                if ((statePlayerSecondary.getCardPlayedBefore() >= 19
                                && statePlayerSecondary.getCardPlayedBefore() <= 27)
                                || List.of(47, 50).contains(statePlayerSecondary.getCardPlayedBefore())) {

                        statePlayerMain.setBullets(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 2));

                }

        }

        @Transactional
        public void executeCard6(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getPrecision() > statePlayerMain.getPrecisionBefore())
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 3));

        }

        @Transactional
        public void executeCard7(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
                        Integer matchId) {
                if (statePlayerSecondary.getPrecision() >= 4)
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 4));

        }

        @Transactional
        public void executeCard8(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
                        Integer matchId) {
                if (statePlayerSecondary.getHealth() > statePlayerMain.getHealth())
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 4));

        }

        @Transactional
        public void executeCard9(List<Integer> deckOfCards, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
                        Integer matchId) {
                if ((statePlayerSecondary.getCardPlayed() >= 19
                                && statePlayerSecondary.getCardPlayed() <= 27)
                                || List.of(47, 50).contains(statePlayerSecondary.getCardPlayed())) {
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 3));

                }
        }

        @Transactional
        public void executeCard10(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {
                statePlayerSecondary.setFailing(1);

                if ((statePlayerSecondary.getCardPlayed() >= 19
                                && statePlayerSecondary.getCardPlayed() <= 27)
                                || List.of(47, 50).contains(statePlayerSecondary.getCardPlayed()))
                        statePlayerMain.setHealth(CardUtils.limitHealth((statePlayerMain.getHealth() + 1)));

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream().filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);
        }

        @Transactional
        public void executeCard11(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary, Integer matchId) {
                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() - 1));

                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 1));

                        statePlayerSecondary.setFailing(1);

                }
        }

        @Transactional
        public void executeCard12(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerSecondary.setFailing(1);

                if (!((statePlayerSecondary.getCardPlayed() >= 19
                                && statePlayerSecondary.getCardPlayed() <= 27)
                                || List.of(47, 50).contains(statePlayerSecondary.getCardPlayed()))) {

                        // DESCARTAR Y ROBAR CARTA

                        List<Integer> updatedCards;

                        updatedCards = statePlayerMain.getCards().stream()
                                        .filter(c -> c != statePlayerMain.getCardPlayed())
                                        .collect(Collectors.toList());
                        Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                        updatedCards.add(newCard);
                        statePlayerMain.setCards(updatedCards);
                }
        }

        @Transactional
        public void executeCard13(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getPrecision() >= 1) {

                        statePlayerMain.setPrecision(statePlayerMain.getPrecision() - 1);
                        statePlayerSecondary.setFailing(1);

                        if ((statePlayerSecondary.getCardPlayed() >= 19
                                        && statePlayerSecondary.getCardPlayed() <= 27)
                                        || List.of(47, 50).contains(statePlayerSecondary.getCardPlayed()))
                                statePlayerMain.setBullets(statePlayerMain.getBullets() + 2);
                }
        }

        @Transactional
        public void executeCard14(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getPrecision() >= 1) {

                        statePlayerMain.setPrecision(statePlayerMain.getPrecision() - 1);
                        statePlayerSecondary.setFailing(1);

                        if ((statePlayerSecondary.getCardPlayed() >= 19
                                        && statePlayerSecondary.getCardPlayed() <= 27)
                                        || List.of(47, 50).contains(statePlayerSecondary.getCardPlayed()))
                                statePlayerSecondary.setBullets(statePlayerSecondary.getBulletsChange()
                                                ? CardUtils.limit(statePlayerSecondary.getBullets() - 2)
                                                : statePlayerSecondary.getBullets());
                }
        }

        @Transactional
        public void executeCard15(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 2)
                                : statePlayerSecondary.getPrecision());
                statePlayerSecondary.setFailing(1);

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream()
                                .filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);
        }

        @Transactional
        public void executeCard16(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getPrecision() >= 1) {

                        statePlayerMain.setPrecision(statePlayerMain.getPrecision() - 1);
                        statePlayerSecondary.setFailing(1);

                        if ((statePlayerSecondary.getCardPlayed() >= 19
                                        && statePlayerSecondary.getCardPlayed() <= 27)
                                        || List.of(47, 50).contains(statePlayerSecondary.getCardPlayed()))
                                statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1
                                                ? statePlayerMain.getPrecision()
                                                : CardUtils.limit(statePlayerMain.getBullets() + 3));
                }
        }

        @Transactional
        public void executeCard17(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerSecondary.setFailing(2);

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream()
                                .filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);
        }

        @Transactional
        public void executeCard18(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        statePlayerSecondary.setFailing(1);

                        if ((statePlayerSecondary.getCardPlayed() >= 19
                                        && statePlayerSecondary.getCardPlayed() <= 27)
                                        || List.of(47, 50).contains(statePlayerSecondary.getCardPlayed()))
                                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 3));
                }
        }

        // ------------------------------------------- FUNCIONES CARTAS DISPARO
        // ----------------------------------------

        @Transactional
        public void executeCard19(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                ? CardUtils.limit(statePlayerMain.getPrecision() - 6)
                                : CardUtils.limit(statePlayerMain.getPrecision() - 5));

                if (aciertoDisparo && statePlayerMain.getFailing() == 0)
                        statePlayerSecondary
                                        .setHealth(!statePlayerSecondary.getPreventDamage()
                                                        ? (statePlayerSecondary.getRecievex2damage()
                                                                        ? CardUtils.limitHealth(
                                                                                        statePlayerSecondary.getHealth()
                                                                                                        - 2)
                                                                        : statePlayerSecondary.getHealth() - 1)
                                                        : statePlayerSecondary.getHealth());

        }

        @Transactional
        public void executeCard20(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                        statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                        ? CardUtils.limit(statePlayerMain.getPrecision() - 5)
                                        : CardUtils.limit(statePlayerMain.getPrecision() - 4));

                        if (aciertoDisparo && statePlayerMain.getFailing() == 0) {
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());
                                statePlayerSecondary.setBullets(statePlayerSecondary.getBulletsChange()
                                                ? CardUtils.limit(statePlayerSecondary.getBullets() - 2)
                                                : statePlayerSecondary.getBullets());
                        }
                }
        }

        @Transactional
        public void executeCard21(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 2) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 2);

                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());
                        if (aciertoDisparo && statePlayerMain.getFailing() == 0)
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());
                        aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());
                        if (aciertoDisparo && statePlayerMain.getFailing() == 0)
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());

                        statePlayerMain.setPrecision(0);
                }
        }

        @Transactional
        public void executeCard22(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                        statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                        ? CardUtils.limit(statePlayerMain.getPrecision() - 5)
                                        : CardUtils.limit(statePlayerMain.getPrecision() - 4));

                        if (aciertoDisparo && statePlayerMain.getFailing() == 0) {
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());
                                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 3)
                                                : statePlayerSecondary.getPrecision());
                        }
                }
        }

        @Transactional
        public void executeCard23(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                        statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                        ? CardUtils.limit(statePlayerMain.getPrecision() - 4)
                                        : CardUtils.limit(statePlayerMain.getPrecision() - 3));

                        if (aciertoDisparo && statePlayerMain.getFailing() == 0) {
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());

                                // DESCARTAR Y ROBAR 2 CARTAS

                                List<Integer> updatedCards;

                                List<Integer> indicesAleatorios = new ArrayList<>();
                                while (indicesAleatorios.size() < 2) {
                                        Double indiceAleatorio = Math
                                                        .floor(Math.random() * statePlayerSecondary.getCards().size()
                                                                        + 1);
                                        if (!indicesAleatorios.contains(indiceAleatorio.intValue())) {
                                                indicesAleatorios.add(indiceAleatorio.intValue());
                                        }
                                }

                                updatedCards = statePlayerSecondary.getCards().stream()
                                                .filter(card -> !indicesAleatorios.contains(
                                                                statePlayerSecondary.getCards().indexOf(card)))
                                                .collect(Collectors.toList());
                                Integer newCard1 = deckOfCards.remove(deckOfCards.size() - 1);
                                Integer newCard2 = deckOfCards.remove(deckOfCards.size() - 1);

                                updatedCards.add(newCard1);
                                updatedCards.add(newCard2);
                                statePlayerSecondary.setCards(updatedCards);
                        }
                }
        }

        @Transactional
        public void executeCard24(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                        statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                        ? CardUtils.limit(statePlayerMain.getPrecision() - 4)
                                        : CardUtils.limit(statePlayerMain.getPrecision() - 3));

                        if (aciertoDisparo && statePlayerMain.getFailing() == 0) {
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());
                                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 1)
                                                : statePlayerSecondary.getPrecision());
                        }
                }
        }

        @Transactional
        public void executeCard25(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                Boolean menosVida = statePlayerMain.getHealth() < statePlayerSecondary.getHealth();

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                        statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                        ? CardUtils.limit(statePlayerMain.getPrecision() - 4)
                                        : CardUtils.limit(statePlayerMain.getPrecision() - 3));

                        if (aciertoDisparo && statePlayerMain.getFailing() == 0)
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());
                        if (menosVida)
                                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 2));

                }
        }

        @Transactional
        public void executeCard26(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                        statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                        ? CardUtils.limit(statePlayerMain.getPrecision() - 4)
                                        : CardUtils.limit(statePlayerMain.getPrecision() - 3));

                        if (aciertoDisparo && statePlayerMain.getFailing() == 0) {
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());
                        } else {
                                List<Integer> updatedCards;

                                updatedCards = statePlayerSecondary.getCards().stream()
                                                .filter(c -> c != statePlayerSecondary.getCardPlayed())
                                                .collect(Collectors.toList());
                                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                                updatedCards.add(newCard);
                                statePlayerSecondary.setCards(updatedCards);
                        }
                }
        }

        @Transactional
        public void executeCard27(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        Boolean aciertoDisparo = CardUtils.disparo(statePlayerMain.getPrecision());

                        statePlayerMain.setPrecision(statePlayerSecondary.getIntimidationCardInHand()
                                        ? CardUtils.limit(statePlayerMain.getPrecision() - 3)
                                        : CardUtils.limit(statePlayerMain.getPrecision() - 2));

                        if (aciertoDisparo && statePlayerMain.getFailing() == 0)
                                statePlayerSecondary
                                                .setHealth(!statePlayerSecondary.getPreventDamage()
                                                                ? (statePlayerSecondary.getRecievex2damage()
                                                                                ? CardUtils.limitHealth(
                                                                                                statePlayerSecondary
                                                                                                                .getHealth()
                                                                                                                - 2)
                                                                                : statePlayerSecondary.getHealth() - 1)
                                                                : statePlayerSecondary.getHealth());

                        if ((statePlayerSecondary.getCardPlayed() >= 10 && statePlayerSecondary.getCardPlayed() <= 18)
                                        || statePlayerSecondary.getCardPlayed() == 48)
                                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                                ? CardUtils.limit(statePlayerSecondary.getPrecision() + 2)
                                                : statePlayerSecondary.getPrecision());
                }
        }

        // ------------------------------------- CARTAS DE CINTURON DE ARMAS
        // -------------------------------------------

}
