package org.springframework.samples.petclinic.match;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.card.CardService;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.gunfighter.GunfighterService;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MatchService {

    private MatchRepository matchRepository;
    private CardService cardService;
    private UserRepository userRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository, CardService cardService, UserRepository userRepository) {
        this.matchRepository = matchRepository;
        this.cardService = cardService;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Iterable<Match> findAll() throws DataAccessException {
        return this.matchRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Match findMatchById(Integer id) throws DataAccessException {
        return this.matchRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match", "ID", id));
    }

    @Transactional
    public Match saveMatch(Match match) throws DataAccessException {
        matchRepository.save(match);
        return match;
    }

    @Transactional(readOnly = true)
    public List<Match> findMatchsByPlayer(String username) throws DataAccessException {
        return (List<Match>) matchRepository.findMatchsByPlayer(username);
    }

    @Transactional(readOnly = true)
    public List<Match> findMatchsClosedByPlayer(String p) throws DataAccessException {
        return (List<Match>) matchRepository.findMatchsClosedByPlayer(p);
    }

    @Transactional(readOnly = true)
    public List<Match> findAllOpenList() throws DataAccessException {
        return (List<Match>) matchRepository.findAllOpen();
    }

    @Transactional
    public void deleteMatch(int id) throws DataAccessException {
        Match toDelete = findMatchById(id);
        matchRepository.delete(toDelete);
    }

    @Transactional
    public void deleteMatches(List<Match> matches) throws DataAccessException {
        matchRepository.deleteAll(matches);
    }

    public Boolean isValidDeck(List<Integer> deck) {
        Boolean range1 = deck.stream().anyMatch(card -> card >= 10 && card <= 18);
        Boolean range2 = deck.stream().anyMatch(card -> card >= 19 && card <= 27);
        return range1 && range2;
    }

    @Transactional
    public void initialDeal(Match m, Gunfighter gunfighter0, Gunfighter gunfighter1) {
        List<Integer> numbers = new ArrayList<>(); // Crea un array de números del 1 al 50
        IntStream.rangeClosed(1, 50).forEach(numbers::add);

        Collections.shuffle(numbers);

        List<Integer> deckPlayer0 = new ArrayList<>();
        List<Integer> deckPlayer1 = new ArrayList<>();

        Boolean validDeal = false;

        while (!validDeal) {
            deckPlayer0.clear();
            deckPlayer1.clear();

            for (int i = 0; i < 8; i++) {
                deckPlayer0.add(numbers.remove(numbers.size() - 1));
                deckPlayer1.add(numbers.remove(numbers.size() - 1));
            }

            if (isValidDeck(deckPlayer0) && isValidDeck(deckPlayer1)) {
                validDeal = true;
            } else {

                numbers.addAll(deckPlayer0);
                numbers.addAll(deckPlayer1);
                Collections.shuffle(numbers);

            }
        }

        m.setDeck(numbers);
        gunfighter0.setCards(deckPlayer0);
        gunfighter1.setCards(deckPlayer1);

    }

    @Transactional
    public void actionCards(Match match, Gunfighter gunfighter0, Gunfighter gunfighter1) {
        if (gunfighter0.getBullets() > gunfighter1.getBullets()) {
            cardService.executeActionsInOrder(gunfighter0.getCardPlayed(), gunfighter1.getCardPlayed(), gunfighter0,
                    gunfighter1, match);
        } else if (gunfighter0.getBullets() == gunfighter1.getBullets()) {
            if (Math.random() < 0.5) {
                cardService.executeActionsInOrder(gunfighter0.getCardPlayed(), gunfighter1.getCardPlayed(), gunfighter0,
                        gunfighter1, match);
            } else {
                cardService.executeActionsInOrder(gunfighter1.getCardPlayed(), gunfighter0.getCardPlayed(), gunfighter1,
                        gunfighter0, match);
            }
        } else {
            cardService.executeActionsInOrder(gunfighter1.getCardPlayed(), gunfighter0.getCardPlayed(), gunfighter1,
                    gunfighter0, match);
        }
    }

    @Transactional(readOnly = true)
    public Integer findWinMatchsByPlayer(Integer u) throws DataAccessException {
        Integer count = 0;
        String userName = userRepository.findById(u).get().getUsername();
        List<Match> matches= findMatchsByPlayer(userName);
        for(Match m:matches){
            if (m.getWinner() == userName) {
                count++;
            }
        }
        return count;
    }

    @Transactional(readOnly = true)
     public Double timePlayedByUserName(Integer u) throws DataAccessException {
        String userName= userRepository.findById(u).get().getUsername();
        List<Double> timePlayedForGamesByPlayer= new ArrayList<>();
        List<Match> matches = findMatchsByPlayer(userName);
        for (Match m : matches) {
            Double tiempo= ChronoUnit.MINUTES.between(m.getStartDate(), m.getFinishDateTime())+0.;
            timePlayedForGamesByPlayer.add(tiempo);
        }
        Double res= timePlayedForGamesByPlayer.stream().mapToDouble(Double::doubleValue).sum();
        return res;
     }
     
     @Transactional(readOnly = true)
        public Double maxTimePlayedByUserName(Integer u) throws DataAccessException {
            String userName= userRepository.findById(u).get().getUsername();
            List<Double> timePlayedForMatchesByPlayer= new ArrayList<>();
            List<Match> matches= findMatchsByPlayer(userName);
            for (Match m : matches) {
                Double tiempo= ChronoUnit.MINUTES.between(m.getStartDate(), m.getFinishDateTime())+0.;
                timePlayedForMatchesByPlayer.add(tiempo);
            }
            Double res= timePlayedForMatchesByPlayer.stream().mapToDouble(Double::doubleValue).max().getAsDouble();
            return res;
        }

         @Transactional(readOnly = true)
         public Double minTimePlayedByUserName(Integer u) throws DataAccessException {
             String userName= userRepository.findById(u).get().getUsername();
             List<Double> timePlayedForMatchesByPlayer= new ArrayList<>();
             List<Match> matches= findMatchsByPlayer(userName);
             for (Match m : matches) {
                 Double tiempo= ChronoUnit.MINUTES.between(m.getStartDate(), m.getFinishDateTime())+0.;
                 timePlayedForMatchesByPlayer.add(tiempo);
             }
             Double res= timePlayedForMatchesByPlayer.stream().mapToDouble(Double::doubleValue).min().getAsDouble();
             return res;
         }

            //Tiempo medio jugado
     @Transactional(readOnly = true)
     public Double averageTimePlayedByUserName(Integer u) throws DataAccessException {
         String userName= userRepository.findById(u).get().getUsername();
         List<Double> timePlayedForMatchesByPlayer= new ArrayList<>();
         List<Match> matches= findMatchsByPlayer(userName);
         for (Match m : matches) {
             Double tiempo= ChronoUnit.MINUTES.between(m.getStartDate(), m.getFinishDateTime())+0.;
             timePlayedForMatchesByPlayer.add(tiempo);
         }
         Double res= timePlayedForMatchesByPlayer.stream().mapToDouble(Double::doubleValue).sum();
         return res/matches.size();
     }
     @Transactional(readOnly = true)
     public Map<String, String> maxPlayerPlayedByUserName(Integer u) throws DataAccessException {
         String userName= userRepository.findById(u).get().getUsername();
         Collection<Match> closedMatches=matchRepository.findMatchsClosedByPlayer(userName);
         Map<String, Integer> rivalMatchCount = new HashMap<>();
         for (Match match : closedMatches) {
            List<String> players = match.getJoinedPlayers();
            for (String player : players) {
                if (!player.equals(userName)) {
                    rivalMatchCount.put(player, rivalMatchCount.getOrDefault(player, 0) + 1);
                }

        
            }
        }
        String maxPlayer= rivalMatchCount.entrySet()
                          .stream()
                          .max(Map.Entry.comparingByValue())
                          .orElse(null)
                          .getKey();
    Map<String, String> response = new HashMap<>();
    response.put("maxPlayer", maxPlayer);

    return response;
    }
    @Transactional(readOnly = true)
        public Map<String, Integer> maxWinnerPlayer() throws DataAccessException {
            Collection<Match> closedMatches=matchRepository.findMatchsClosed();
            Map<String, Integer> winnerCountMap = new HashMap<>();
            for (Match match : closedMatches) {
                 String winner = match.getWinner();
                 if (winner != null) { 
                    winnerCountMap.put(winner, winnerCountMap.getOrDefault(winner, 0) + 1);
                }
        }
    

    return winnerCountMap;
    }
}