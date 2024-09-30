package org.springframework.samples.petclinic.gameRequests;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.gameRequests.GameRequest;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.samples.petclinic.match.Match;

import lombok.With;

@WebMvcTest(controllers = GameRequestRestController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class GameRequestRestControllerTests {

    private static final int TEST_GAME_REQUEST_ID = 1;
    private static final String BASE_URL = "/api/v1/gameRequests";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GameRequestService gameRequestService;

    @MockBean
    private PlayerService playerService;

    @MockBean
    private MatchService matchService;

    @MockBean
    private UserService userService;

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
    @WithMockUser(username = "admin")
    void testGetAllRequests() throws Exception {

        when(gameRequestService.findAll()).thenReturn(List.of(gameRequest1, gameRequest2, gameRequest3));
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(3));
    }

    @Test
    @WithMockUser(username = "admin")
    void testFindById() throws Exception {
        when(gameRequestService.findById(TEST_GAME_REQUEST_ID)).thenReturn(gameRequest1);
        mockMvc.perform(get(BASE_URL + "/" + TEST_GAME_REQUEST_ID))
                .andExpect(status().isOk()) // isOk() verifica el código 200
                .andExpect(jsonPath("$.id").value(TEST_GAME_REQUEST_ID));
    }

    @Test
    @WithMockUser(username = "admin")
    void testFindReceivedRequest() throws Exception {
        when(gameRequestService.findRecievedGameRequest(3)).thenReturn(List.of(gameRequest1, gameRequest2));
        mockMvc.perform(get(BASE_URL + "/3/received"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser(username = "admin")
    void testCreate() throws Exception {
        GameRequestDTO gameRequestDTO = new GameRequestDTO();
        gameRequestDTO.setPlayerOne("1");
        gameRequestDTO.setPlayerTwo("2");
        gameRequestDTO.setMatchId("1");
        gameRequestDTO.setType("player");
        gameRequestDTO.setStatus("PENDING");

        // Crear objetos Player y Match con IDs
        Player playerOne = new Player();
        playerOne.setId(1);

        Player playerTwo = new Player();
        playerTwo.setId(2);

        Match match = new Match();
        match.setId(1);

        // Configurar los mocks para devolver estos objetos
        when(playerService.findPlayer(1)).thenReturn(playerOne);
        when(playerService.findPlayer(2)).thenReturn(playerTwo);
        when(matchService.findMatchById(1)).thenReturn(match);

        // Asigna el ID al GameRequest simulado
        gameRequest1.setId(1);
        when(gameRequestService.saveRequest(any(GameRequest.class))).thenReturn(gameRequest1);

        // Realiza la petición POST y verifica el estado y el ID
        mockMvc.perform(post(BASE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(gameRequestDTO))
                .with(csrf()))
                .andExpect(status().isCreated()) // Verifica que el estado es 201 Created
                .andExpect(jsonPath("$.id").value(1)); // Verifica que el ID es 1 en la
    }

    @Test
    @WithMockUser(username = "admin")
    void testUpdate() throws Exception {
        GameRequest updatedGameRequest = new GameRequest();
        updatedGameRequest.setId(1);
        updatedGameRequest.setStatus(GameRequestStatus.ACCEPTED);
        updatedGameRequest.setPlayerOne(new Player());
        updatedGameRequest.setPlayerTwo(new Player());
        updatedGameRequest.setMatchId(new Match().getId());
        updatedGameRequest.setType(GameRequestType.PLAYER);

        when(gameRequestService.findById(1)).thenReturn(gameRequest1);
        when(gameRequestService.acceptRequest(any(GameRequest.class), eq(1))).thenReturn(updatedGameRequest);

        mockMvc.perform(put(BASE_URL + "/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(updatedGameRequest))
                .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ACCEPTED"));
    }

    @Test
    @WithMockUser(username = "admin")
    void testDelete() throws Exception {
        doNothing().when(gameRequestService).rejectRequest(gameRequest1);
        mockMvc.perform(delete(BASE_URL + "/" + TEST_GAME_REQUEST_ID)
                .with(csrf()))
                .andExpect(status().isNoContent());
    }
}
