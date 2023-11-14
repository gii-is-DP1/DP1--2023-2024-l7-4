package org.springframework.samples.petclinic.player;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(PlayerRestController.class)
class PlayerRestControllerTests {

    private static final int TEST_PLAYER_ID = 1;
    private static final String BASE_URL = "/api/v1/players";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlayerService playerService;

    @MockBean
    private MatchService matchService;

    @Autowired
    private ObjectMapper objectMapper;

    private Player player1;
    private Player player2;

    @BeforeEach
    void setup() {
        player1 = new Player();
        player1.setId(TEST_PLAYER_ID);
        player1.setName("John");
        player1.setSurname("Doe");

        player2 = new Player();
        player2.setId(2);
        player2.setName("Jane");
        player2.setName("Doe");
    }

    @Test
    @WithMockUser("admin")
    void shouldFindAllPlayers() throws Exception {
        when(playerService.findAll()).thenReturn(List.of(player1, player2));

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].name").value("John"))
                .andExpect(jsonPath("$[1].name").value("Doe"));
    }

    @Test
    @WithMockUser("admin")
    void shouldReturnPlayerById() throws Exception {
        when(playerService.findPlayer(TEST_PLAYER_ID)).thenReturn(player1);

        mockMvc.perform(get(BASE_URL + "/{id}", TEST_PLAYER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TEST_PLAYER_ID))
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.surname").value("Doe"));
    }

    @Test
    @WithMockUser("admin")
    void shouldReturnNotFoundPlayerById() throws Exception {
        when(playerService.findPlayer(TEST_PLAYER_ID)).thenThrow(ResourceNotFoundException.class);

        mockMvc.perform(get(BASE_URL + "/{id}", TEST_PLAYER_ID))
                .andExpect(status().isNotFound());
    }

}
