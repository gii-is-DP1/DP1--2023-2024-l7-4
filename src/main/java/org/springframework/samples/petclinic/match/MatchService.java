package org.springframework.samples.petclinic.match;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.gunfighter.GunfighterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MatchService {

    private MatchRepository matchRepository;
    private GunfighterService gunfighterService;

    @Autowired
    public MatchService(MatchRepository matchRepository, GunfighterService gunfighterService) {
        this.matchRepository = matchRepository;
        this.gunfighterService = gunfighterService;

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
}