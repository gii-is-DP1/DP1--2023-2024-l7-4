package org.springframework.samples.petclinic.player;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
//@DataJpaTest(includeFilters = {@ComponentScan.Filter(Service.class),@ComponentScan.Filter(PasswordEncoder.class)})
@SpringBootTest
@AutoConfigureTestDatabase
public class PlayerServiceTests {
    
    private PlayerService playerService;

    @Autowired
    public PlayerServiceTests(PlayerService playerService) {
        this.playerService = playerService;
    }

    @Test
    void shouldFindAll(){
        List<Player> todos = (List<Player>) this.playerService.findAll();
        assertEquals(0, todos.size());
    }

    @Test
    void shouldSortedPlayersByPuntuation(){
        List<Player> todos = (List<Player>) this.playerService.sortedPlayersByPuntuation();
        List<Player> copia = new ArrayList<>(todos);
        Collections.sort(copia, Comparator.comparing(Player :: getTotal_score));
        assertEquals(todos, copia);
    }

    @Test
    void shouldFindPlayer() {
        assertThrows(ResourceNotFoundException.class, () -> this.playerService.findPlayer(100));
    }

    @Test
    void shouldFindByUsername() {
        assertThrows(ResourceNotFoundException.class, () -> this.playerService.findByUsername("danfercab"));
    }
}
