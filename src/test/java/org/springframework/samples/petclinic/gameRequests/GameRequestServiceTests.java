package org.springframework.samples.petclinic.gameRequests;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
public class GameRequestServiceTests {

    @Mock
    private GameRequestRepository gameRequestRepository;

    @InjectMocks
    private GameRequestService gameRequestService;

    private GameRequest gameRequest1;
    private GameRequest gameRequest2;
    private GameRequest gameRequest3;

    @BeforeEach
    void setup() {
        gameRequest1 = new GameRequest();
        gameRequest1.setId(1);
        gameRequest1.setPlayerOne(new Player());
        gameRequest1.setPlayerTwo(new Player());
        gameRequest1.setStatus(GameRequestStatus.PENDING);

        gameRequest2 = new GameRequest();
        gameRequest2.setId(2);
        gameRequest2.setPlayerOne(new Player());
        gameRequest2.setPlayerTwo(new Player());
        gameRequest2.setStatus(GameRequestStatus.PENDING);

        gameRequest3 = new GameRequest();
        gameRequest3.setId(3);
        gameRequest3.setPlayerOne(new Player());
        gameRequest3.setPlayerTwo(new Player());
        gameRequest3.setStatus(GameRequestStatus.ACCEPTED);

    }

    @Test
    void testFindAll() {
        when(gameRequestRepository.findAll()).thenReturn(List.of(gameRequest1, gameRequest2, gameRequest3));
        List<GameRequest> gameRequests = gameRequestService.findAll();
        assertEquals(3, gameRequests.size());
    }

    @Test
    void testFindById() {
        when(gameRequestRepository.findById(1)).thenReturn(gameRequest1);
        GameRequest gameRequest = gameRequestService.findById(1);
        assertNotNull(gameRequest);
        assertEquals(1, gameRequest.getId());
    }

    @Test
    void testFindReceivedGameRequest() {
        when(gameRequestRepository.findReceivedGameRequest(3)).thenReturn(List.of(gameRequest1, gameRequest2));
        List<GameRequest> gameRequests = gameRequestService.findRecievedGameRequest(3);
        assertEquals(2, gameRequests.size());
    }

    @Test
    void testSaveRequest() {
        when(gameRequestRepository.save(gameRequest1)).thenReturn(gameRequest1);
        GameRequest savedGameRequest = gameRequestService.saveRequest(gameRequest1);
        assertNotNull(savedGameRequest);
        assertEquals(1, savedGameRequest.getId());
    }

    @Test
    void testAcceptRequest() {
        when(gameRequestRepository.findById(1)).thenReturn(gameRequest1);
        when(gameRequestRepository.save(gameRequest1)).thenReturn(gameRequest1);
        GameRequest acceptedGameRequest = gameRequestService.acceptRequest(gameRequest1, 1);
        assertNotNull(acceptedGameRequest);
        assertEquals(GameRequestStatus.ACCEPTED, acceptedGameRequest.getStatus());
    }

    @Test
    void testRejectRequest() {
        when(gameRequestRepository.findById(1)).thenReturn(gameRequest1);
        when(gameRequestRepository.save(gameRequest1)).thenReturn(gameRequest1);
        gameRequestService.rejectRequest(gameRequest1);

    }

}
