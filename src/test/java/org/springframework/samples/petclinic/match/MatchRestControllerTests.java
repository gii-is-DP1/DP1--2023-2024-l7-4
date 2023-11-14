package org.springframework.samples.petclinic.match;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(value = MatchRestController.class)
class MatchRestControllerTest {

    private static final int TEST_MATCH_ID = 1;
    private static final String BASE_URL = "/api/v1/matches";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MatchService matchService;

    @MockBean
    private PlayerService playerService;

    private Match testMatch;
    private Player testPlayer;

    @BeforeEach
    void setup() {
        testMatch = new Match();
        testMatch.setId(TEST_MATCH_ID);
        testMatch.setName("Test Match");
        testMatch.setMatchTime(60);
        testMatch.setMaxPlayers(4);
        testMatch.setScoreCrit(new ArrayList<>());
        testMatch.setWinner("No winner yet");
        testMatch.setCreator(new Player());
        testMatch.setJoinedPlayers(new HashSet<>());
        testMatch.setMatchState(MatchState.OPEN);

        testPlayer = new Player();
        testPlayer.setId(1);
        testPlayer.setUsername("testuser");
    }

    @Test
    void shouldFindAllMatches() throws Exception {
        List<Match> matchList = new ArrayList<>();
        matchList.add(testMatch);

        when(matchService.findAll()).thenReturn(matchList);

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].name").value("Test Match"));
    }

    @Test
    void shouldCreateMatch() throws Exception {
        when(matchService.saveMatch(any(Match.class))).thenReturn(testMatch);

        mockMvc.perform(post(BASE_URL).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testMatch)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Match"));
    }

    @Test
    void shouldUpdateMatchJoining() throws Exception {
        when(matchService.findMatchById(TEST_MATCH_ID)).thenReturn(testMatch);
        when(playerService.findByUsername("testuser")).thenReturn(testPlayer);

        mockMvc.perform(put(BASE_URL + "/{id}/join", TEST_MATCH_ID).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString("testuser")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.joinedPlayers").value("testuser"))
                .andExpect(jsonPath("$.matchState").value("OPEN")); 
    }


}