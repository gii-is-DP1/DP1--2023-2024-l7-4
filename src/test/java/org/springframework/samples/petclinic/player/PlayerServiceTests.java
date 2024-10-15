package org.springframework.samples.petclinic.player;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.user.Authorities;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureTestDatabase
public class PlayerServiceTests {

    @Mock
    private PlayerRepository playerRepository;

    @InjectMocks
    private PlayerService playerService;

    private Player john;
    private Authorities authorities;

    @BeforeEach
    void setup() {
        authorities = new Authorities();
        authorities.setAuthority("PLAYER");

        john = new Player();
        john.setId(1);
        john.setUsername("john.doe");
        john.setPassword("password");
        john.setAuthority(authorities);
        john.setName("John");
        john.setSurname("Doe");
        john.setAvatar("avatar.png");
        john.setNickname("johndoe");
        john.setEmail("john.doe@example.com");
        john.setLocation("London");
        john.setProfileType(ProfileType.HARDCORE);
    }

    @Test
    void shouldFindAll() {
        when(playerRepository.findAll()).thenReturn(List.of(john));
        List<Player> todos = (List<Player>) playerService.findAll();
        assertEquals(1, todos.size());
    }

    @Test
    void shouldFindPlayer() {
        when(playerRepository.findById(1)).thenReturn(Optional.of(john));
        Player found = playerService.findPlayer(1);
        assertEquals(john.getName(), found.getName());
    }

    @Test
    void shouldFindByUsername() {
        when(playerRepository.existsPlayer("john.doe")).thenReturn(Optional.of(john));
        Player found = playerService.findByUsername("john.doe");
        assertEquals(john.getUsername(), found.getUsername());
    }

    @Test
    void shouldThrowResourceNotFoundExceptionWhenPlayerNotFound() {
        when(playerRepository.findById(100)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> playerService.findPlayer(100));

        when(playerRepository.existsPlayer("nonexistent")).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> playerService.findByUsername("nonexistent"));
    }

    @Test
    void shouldSavePlayer() {
        when(playerRepository.save(any(Player.class))).thenReturn(john);
        Player saved = playerService.savePlayer(john);
        assertEquals(john.getUsername(), saved.getUsername());
    }

    @Test
    void shouldUpdatePlayer() {
        Player updated = new Player();
        updated.setName("UpdatedName");
        updated.setSurname("UpdatedSurname");

        when(playerRepository.findById(1)).thenReturn(Optional.of(john));
        when(playerRepository.save(any(Player.class))).thenAnswer(i -> i.getArgument(0));

        Player result = playerService.updatePlayer(updated, 1);
        assertEquals(updated.getName(), result.getName());
        assertEquals(updated.getSurname(), result.getSurname());
    }

    @Test
    void shouldDeletePlayerById() {
        when(playerRepository.findById(1)).thenReturn(Optional.of(john));
        playerService.deletePlayer(1);
    }

    @Test
    void shouldDeletePlayerByUsername() {
        when(playerRepository.existsPlayer("john.doe")).thenReturn(Optional.of(john));
        playerService.deletePlayer("john.doe");
    }

    @Test
    void shouldCheckPlayerExistsByUsername() {
        when(playerRepository.existsPlayer("john.doe")).thenReturn(Optional.of(john));
        Boolean exists = playerService.existsPlayer("john.doe");
        assertEquals(true, exists);

        when(playerRepository.existsPlayer("nonexistent")).thenReturn(Optional.empty());
        Boolean notExists = playerService.existsPlayer("nonexistent");
        assertEquals(false, notExists);
    }
}