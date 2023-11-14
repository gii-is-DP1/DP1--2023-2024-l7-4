package org.springframework.samples.petclinic.player;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
public class PlayerServiceTests {

    private PlayerService playerService;

    @Autowired
    public PlayerServiceTests(PlayerService playerService) {
        this.playerService = playerService;
    }

    @Test
    void shouldFindAllPlayers() {
        List<Player> players = (List<Player>) this.playerService.findAll();
        assertEquals(10, players.size());
    }

    @Test
    void shouldFindPlayerByUsername() {
        Player player = this.playerService.findByUsername("testPlayer");
        assertNotNull(player);
        assertEquals("Test", player.getName());
        assertEquals("Player", player.getSurname());
    }

    @Test
    void shouldThrowExceptionWhenFindingNonExistingPlayerByUsername() {
        assertThrows(ResourceNotFoundException.class, () -> this.playerService.findByUsername("nonExistingPlayer"));
    }

    @Test
    @Transactional
    void shouldUpdatePlayer() {
        Player player = this.playerService.findPlayer(1);
        player.setTotal_score(100);
        Player updatedPlayer = this.playerService.updatePlayer(player, 1);
        assertEquals(100, updatedPlayer.getTotal_score());
    }

    @Test
    @Transactional
    void shouldCreatePlayer() {
        Player newPlayer = new Player();
        newPlayer.setName("New");
        newPlayer.setSurname("Player");
        newPlayer.setUsername("newPlayer");
        Player createdPlayer = this.playerService.savePlayer(newPlayer);
        assertNotNull(createdPlayer.getId());
    }

    @Test
    @Transactional
    void shouldDeletePlayer() {
        int initialCount = ((List<Player>) this.playerService.findAll()).size();
        this.playerService.deletePlayer(1);
        int finalCount = ((List<Player>) this.playerService.findAll()).size();
        assertEquals(initialCount - 1, finalCount);
    }
}

