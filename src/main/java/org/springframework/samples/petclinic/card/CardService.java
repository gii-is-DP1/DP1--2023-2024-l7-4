package org.springframework.samples.petclinic.card;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.match.Match;
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
        public void executeActionsInOrder(Integer cardFirst, Integer cardSecond, Gunfighter gunfighterFirst,
                        Gunfighter gunfighterSecond, Match match) {
                executeSingleCard(cardFirst, gunfighterFirst, gunfighterSecond, match.getDeck(), match.getId());
                executeSingleCard(cardSecond, gunfighterSecond, gunfighterFirst, match.getDeck(), match.getId());
        }

        @Transactional
        private void executeSingleCard(Integer card, Gunfighter statePlayerMain, Gunfighter statePlayerSecondary,
                        List<Integer> deck, Integer matchId) {
                switch (card) {
                        default:
                                break;
                        case 1:
                                executeCard1(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 2:
                                executeCard2(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 3:
                                executeCard3(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 4:
                                executeCard4(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 5:
                                executeCard5(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 6:
                                executeCard6(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 7:
                                executeCard7(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 8:
                                executeCard8(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 9:
                                executeCard9(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 10:
                                executeCard10(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 11:
                                executeCard11(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 12:
                                executeCard12(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 13:
                                executeCard13(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 14:
                                executeCard14(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 15:
                                executeCard15(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 16:
                                executeCard16(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 17:
                                executeCard17(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 18:
                                executeCard18(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 19:
                                executeCard19(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 20:
                                executeCard20(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 21:
                                executeCard21(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 22:
                                executeCard22(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 23:
                                executeCard23(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 24:
                                executeCard24(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 25:
                                executeCard25(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 26:
                                executeCard26(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 27:
                                executeCard27(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 28:
                                executeCard28(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 29:
                                executeCard29(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 30:
                                executeCard30(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 31:
                                executeCard31(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 32:
                                executeCard32(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 33:
                                executeCard33(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 34:
                                executeCard34(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 35:
                                executeCard35(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 36:
                                executeCard36(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 37:
                                executeCard37(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 38:
                                executeCard38(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 39:
                                executeCard39(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 40:
                                executeCard40(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 41:
                                executeCard41(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 42:
                                executeCard42(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 43:
                                executeCard43(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 44:
                                executeCard44(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 45:
                                executeCard45(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 46:
                                executeCard46(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 47:
                                executeCard47(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 48:
                                executeCard48(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 49:
                                executeCard49(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 50:
                                executeCard50(deck, statePlayerMain, statePlayerSecondary, matchId);
                                break;
                        case 51:
                                executeCard51(deck, statePlayerMain, statePlayerSecondary, matchId);

                }
                ;

        }

        @Transactional
        private void executeCard1(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                : CardUtils.limit(statePlayerMain.getPrecision() + 1));

                if (Math.random() < 0.5 && statePlayerMain.getBullets() >= 2) {
                        statePlayerMain.setPreventDamage(true);
                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 2);
                }

        }

        @Transactional
        private void executeCard2(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (Math.random() < 0.5) {
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 1));
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
        private void executeCard3(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
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
                                statePlayerMain.getPlayerNumber() == 0 ? 3 : -1,
                                statePlayerMain.getPlayerNumber() == 1 ? 3 : -1);

                notificationService.sendMessage("/topic/match/" + matchId + "/cards", message);

        }

        @Transactional
        private void executeCard4(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
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
        private void executeCard5(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
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
        private void executeCard6(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getPrecision() > statePlayerMain.getPrecisionBefore())
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 3));

        }

        @Transactional
        private void executeCard7(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {
                if (statePlayerSecondary.getPrecision() >= 4)
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 4));

        }

        @Transactional
        private void executeCard8(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {
                if (statePlayerSecondary.getHealth() > statePlayerMain.getHealth())
                        statePlayerMain.setPrecision(
                                        statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                        : CardUtils.limit(statePlayerMain.getPrecision() + 4));

        }

        @Transactional
        private void executeCard9(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
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
        private void executeCard10(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard11(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard12(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard13(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard14(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard15(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard16(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard17(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard18(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard19(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard20(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard21(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard22(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard23(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard24(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard25(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard26(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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
        private void executeCard27(List<Integer> deckOfCards, Gunfighter statePlayerMain,
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

        @Transactional
        private void executeCard28(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 1));
                statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                : CardUtils.limit(statePlayerMain.getPrecision() + 1));

        }

        @Transactional
        private void executeCard29(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 3)
                                : statePlayerSecondary.getPrecision());
                statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                : CardUtils.limit(statePlayerMain.getPrecision() + 1));

        }

        @Transactional
        private void executeCard30(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 1));

                statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                : CardUtils.limit(statePlayerMain.getPrecision() + 1));

                // TODO: MANDAR MODAL POR SI QUIERE DESCARTAR DOS CARTAS PARA PREVENIR EL DAÑO
                // Versión preliminar que lo hace de forma aleatoria

                Double random = Math.random();
                if (random < 0.5) {

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

                        statePlayerMain.setCards(updatedCards);
                        statePlayerMain.setPrecisionChange(false);
                }

        }

        @Transactional
        private void executeCard31(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 2));
                statePlayerMain.setPrecision(CardUtils.limit(statePlayerMain.getPrecision() - 1));

                statePlayerMain.setWinPrecision(2);
        }

        @Transactional
        private void executeCard32(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setPrecision(statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                : CardUtils.limit(statePlayerMain.getPrecision() + 3));

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream().filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

        }

        @Transactional
        private void executeCard33(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerSecondary.setBullets(statePlayerSecondary.getBulletsChange()
                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 2)
                                : statePlayerSecondary.getBullets());

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream().filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

        }

        @Transactional
        private void executeCard34(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 2));

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream().filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

        }

        @Transactional
        private void executeCard35(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() == 0) {

                        statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 3));

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
        private void executeCard36(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 1));

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream()
                                .filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

                MatchDeckMessage message = new MatchDeckMessage(TypeMessage.CHOOSE, deckOfCards, List.of(), List.of(),
                                statePlayerMain.getPlayerNumber() == 0 ? 3 : -1,
                                statePlayerMain.getPlayerNumber() == 1 ? 3 : -1);

                notificationService.sendMessage("/topic/match/" + matchId + "/cards", message);

        }

        // ----------------------------------------- CARTAS DE INTIMIDACIÓN
        // --------------------------------------

        @Transactional
        private void executeCard37(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream()
                                .filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 4)
                                : statePlayerSecondary.getPrecision());
        }

        @Transactional
        private void executeCard38(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() - 1));
                        statePlayerMain.setBulletsChange(false);
                        statePlayerMain.setPrecisionChange(false);

                        statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                        ? CardUtils.limit(statePlayerSecondary.getPrecision() - 3)
                                        : statePlayerSecondary.getPrecision());

                }
        }

        @Transactional
        private void executeCard39(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if ((statePlayerSecondary.getCardPlayedBefore() >= 10
                                && statePlayerSecondary.getCardPlayedBefore() <= 18)
                                || statePlayerSecondary.getCardPlayedBefore() == 48) {

                        statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 1));

                        statePlayerSecondary.setBullets(statePlayerSecondary.getBulletsChange()
                                        ? CardUtils.limit(statePlayerSecondary.getBullets() - 1)
                                        : statePlayerSecondary.getBullets());

                }
        }

        @Transactional
        private void executeCard40(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream()
                                .filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 1)
                                : statePlayerSecondary.getPrecision());

                if ((statePlayerSecondary.getCardPlayedBefore() >= 10
                                && statePlayerSecondary.getCardPlayedBefore() <= 18)
                                || statePlayerSecondary.getCardPlayedBefore() == 48) {

                        statePlayerSecondary.setBullets(statePlayerSecondary.getBulletsChange()
                                        ? CardUtils.limit(statePlayerSecondary.getBullets() - 2)
                                        : statePlayerSecondary.getBullets());

                }
        }

        @Transactional
        private void executeCard41(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream()
                                .filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

                // TODO: Setear "insidious" a true. Ver a que se refiere
        }

        @Transactional
        private void executeCard42(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                // DESCARTAR Y ROBAR CARTA

                List<Integer> updatedCards;

                updatedCards = statePlayerMain.getCards().stream()
                                .filter(c -> c != statePlayerMain.getCardPlayed())
                                .collect(Collectors.toList());
                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                updatedCards.add(newCard);
                statePlayerMain.setCards(updatedCards);

                statePlayerSecondary.setBullets(statePlayerSecondary.getBulletsChange()
                                ? CardUtils.limit(statePlayerSecondary.getBullets() - 1)
                                : statePlayerSecondary.getBullets());
        }

        @Transactional
        private void executeCard43(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if ((statePlayerSecondary.getCardPlayedBefore() >= 10
                                && statePlayerSecondary.getCardPlayedBefore() <= 18)
                                || statePlayerSecondary.getCardPlayedBefore() == 48) {
                        if (statePlayerSecondary.getPrecision() >= 4) {
                                statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                                ? CardUtils.limit(statePlayerSecondary.getPrecision() - 4)
                                                : statePlayerSecondary.getPrecision());
                        }
                }
        }

        @Transactional
        private void executeCard44(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() - 1));
                        statePlayerMain.setBulletsChange(false);
                        statePlayerMain.setPrecisionChange(false);

                        statePlayerSecondary.setPrecision(statePlayerSecondary.getPrecisionChange()
                                        ? CardUtils.limit(statePlayerSecondary.getPrecision() - 3)
                                        : statePlayerSecondary.getPrecision());

                        if (statePlayerSecondary.getHealth() > statePlayerMain.getHealth()) {
                                statePlayerMain.setPrecision(
                                                statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                                : CardUtils.limit(statePlayerMain.getPrecision() + 2));
                        }

                }
        }

        // TODO: Funcion carta 45
        @Transactional
        private void executeCard45(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

        }

        @Transactional
        private void executeCard46(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getCardPlayedBefore() == 46) {

                        // DESCARTAR Y ROBAR CARTA

                        List<Integer> updatedCards;

                        updatedCards = statePlayerMain.getCards().stream()
                                        .filter(c -> c != statePlayerMain.getCardPlayed())
                                        .collect(Collectors.toList());
                        Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                        updatedCards.add(newCard);
                        statePlayerMain.setCards(updatedCards);

                        statePlayerSecondary.setBullets(statePlayerSecondary.getBulletsChange()
                                        ? CardUtils.limit(statePlayerSecondary.getBullets() - 4)
                                        : statePlayerSecondary.getBullets());
                }
        }

        @Transactional
        private void executeCard47(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 1) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 1);
                        statePlayerMain.setPrecisionChange(false);
                        statePlayerMain.setBulletsChange(false);

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

                }
        }

        @Transactional
        private void executeCard48(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                statePlayerMain.setPrecision(CardUtils.limit(statePlayerMain.getPrecision() - 1));
                statePlayerMain.setPreventDamage(true);

                statePlayerSecondary.setFailing(1);
                Double discardProbability = Math.random();

                if (discardProbability > 0.5) {
                        Integer cardToDiscard = statePlayerMain.getCards().stream()
                                        .filter(card -> (card >= 10 && card <= 18) || card == 48)
                                        .findAny().orElse(-1);

                        if (cardToDiscard != -1) {
                                // DESCARTAR Y ROBAR CARTA

                                List<Integer> updatedCards;

                                updatedCards = statePlayerMain.getCards().stream()
                                                .filter(c -> c != cardToDiscard)
                                                .collect(Collectors.toList());
                                Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                                updatedCards.add(newCard);
                                statePlayerMain.setCards(updatedCards);

                                statePlayerMain.setBullets(statePlayerMain.getBullets() + 2);

                        }

                }

        }

        @Transactional
        private void executeCard49(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                List<Integer> indicesAleatorios = List.of(statePlayerMain.getCardPlayed());
                while (indicesAleatorios.size() < 3) {
                        Double indiceAleatorio = Math
                                        .floor(Math.random() * statePlayerMain.getCards().size()
                                                        + 1);
                        if (!indicesAleatorios.contains(indiceAleatorio.intValue())) {
                                indicesAleatorios.add(indiceAleatorio.intValue());
                        }
                }

                List<Integer> updatedCards = statePlayerMain.getCards().stream()
                                .filter(card -> !indicesAleatorios.contains(
                                                statePlayerMain.getCards().indexOf(card)))
                                .collect(Collectors.toList());

                statePlayerMain.setCards(updatedCards);
                statePlayerMain.setHealth(CardUtils.limitHealth(statePlayerMain.getHealth() + 1));
        }

        @Transactional
        private void executeCard50(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {

                if (statePlayerMain.getBullets() >= 2) {

                        statePlayerMain.setBullets(statePlayerMain.getBullets() - 2);
                        statePlayerMain.setPrecisionChange(false);
                        statePlayerMain.setBulletsChange(false);

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
                                statePlayerMain.setPrecision(
                                                statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                                : CardUtils.limit(statePlayerMain.getPrecision() + 3));
                        }
                }
        }

        @Transactional
        private void executeCard51(List<Integer> deckOfCards, Gunfighter statePlayerMain,
                        Gunfighter statePlayerSecondary,
                        Integer matchId) {
                Double randomNumber = Math.random();

                if (randomNumber < 0.5) {
                        Double random = Math.random();
                        if (random < 0.5) {
                                statePlayerMain.setPrecision(
                                                statePlayerMain.getWinPrecision() == 1 ? statePlayerMain.getPrecision()
                                                                : CardUtils.limit(statePlayerMain.getPrecision() + 2));

                        } else {
                                statePlayerMain.setBullets(CardUtils.limit(statePlayerMain.getBullets() + 1));

                        }
                } else {
                        Double randomCardIndex = Math.random() * (statePlayerMain.getCards().size() + 1);
                        List<Integer> updatedCards = statePlayerMain.getCards();
                        updatedCards.remove(randomCardIndex.intValue());

                        Integer newCard = deckOfCards.remove(deckOfCards.size() - 1);

                        updatedCards.add(newCard);
                        statePlayerMain.setCards(updatedCards);

                }

        }
}