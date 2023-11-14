package org.springframework.samples.petclinic.match;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
public class MatchServiceTests {

    private MatchService matchService;
    private PlayerService playerService;

    @Autowired
    public MatchServiceTests(MatchService matchService, PlayerService playerService) {
        this.matchService = matchService;
        this.playerService = playerService;
    }

    @Test
    void shouldFindAllMatches() {
        List<Match> matches = (List<Match>) this.matchService.findAll();
        assertEquals(0, matches.size());
    }

    @Test
    void shouldFindMatchById() {
        Match match = this.matchService.findMatchById(1);
        assertThat(match).isNotNull();
        assertEquals("Test Match", match.getName());
    }

    @Test
    void shouldNotFindMatchByIncorrectId() {
        assertThrows(NoSuchElementException.class, () -> this.matchService.findMatchById(100));
    }

    @Test
    @Transactional
    void shouldSaveMatch() {
        int initialCount = ((Collection<Match>) this.matchService.findAll()).size();

        Match match = createTestMatch();
        assertNotEquals(0, match.getId().longValue());

        int finalCount = ((Collection<Match>) this.matchService.findAll()).size();
        assertEquals(initialCount + 1, finalCount);
    }

    @Test
    @Transactional
    void shouldUpdateMatch() {
        Match match = this.matchService.findMatchById(1);
        match.setName("Updated Match");
        matchService.saveMatch(match);

        match = this.matchService.findMatchById(1);
        assertEquals("Updated Match", match.getName());
    }

    @Test
    @Transactional
    void shouldDeleteMatch() {
        Integer firstCount = ((Collection<Match>) matchService.findAll()).size();
Match match = createTestMatch();
        Player player = new Player();
        player.setUsername("testplayer");
        match.getJoinedPlayers().add(player.getUsername());
        playerService.savePlayer(player);
        matchService.saveMatch(match);

        Integer secondCount = ((Collection<Match>) matchService.findAll()).size();
        assertEquals(firstCount + 1, secondCount);

        matchService.deleteMatch(match.getId());
        Integer lastCount = ((Collection<Match>) matchService.findAll()).size();
        assertEquals(firstCount, lastCount);
    }

    private Match createTestMatch() {
        Match match = new Match();
        match.setName("Test Match");
        match.setMatchTime(60);
        match.setMaxPlayers(4);
        match.setScoreCrit(List.of("Criteria 1", "Criteria 2"));
        match.setWinner("No winner yet");
        match.setCreator(new Player());
        match.setJoinedPlayers(Set.of("player1", "player2"));
        match.setMatchState(MatchState.OPEN);
        return this.matchService.saveMatch(match);
    }
}