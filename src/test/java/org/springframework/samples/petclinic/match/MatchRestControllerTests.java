package org.springframework.samples.petclinic.match;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(value = MatchRestController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = WebSecurityConfigurer.class))
class MatchRestControllerTests {

    private static final int TEST_MATCH_ID = 1;
    private static final String BASE_URL = "/api/v1/matches";

    @Autowired
    private MatchRestController matchController;

    @MockBean
    private MatchService matchService;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    private Match match;

    @BeforeEach
    void setup() {
        match = new Match();
        match.setId(TEST_MATCH_ID);
        match.setName("Test Match");
        match.setMatchState(MatchState.OPEN);
        match.setJoinedPlayers(List.of("player1", "player2"));
    }

    @Test
    @WithMockUser("admin")
    void shouldFindAll() throws Exception {
        when(this.matchService.findAll()).thenReturn(List.of(match));
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].id").value(TEST_MATCH_ID));
    }

    @Test
    @WithMockUser("admin")
    void shouldReturnMatch() throws Exception {
        when(this.matchService.findMatchById(TEST_MATCH_ID)).thenReturn(match);
        mockMvc.perform(get(BASE_URL + "/{id}", TEST_MATCH_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TEST_MATCH_ID))
                .andExpect(jsonPath("$.name").value(match.getName()))
                .andExpect(jsonPath("$.matchState").value(match.getMatchState().toString()))
                .andExpect(jsonPath("$.joinedPlayers.size()").value(match.getJoinedPlayers().size()));
    }

    @Test
    @WithMockUser("admin")
    void shouldReturnMatchesByUsername() throws Exception {
        String username = "player1";
        when(this.matchService.findMatchsByPlayer(username)).thenReturn(List.of(match));
        mockMvc.perform(get(BASE_URL + "/player/{username}", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].id").value(TEST_MATCH_ID));
    }

    @Test
    @WithMockUser("admin")
    void shouldCreateMatch() throws Exception {
        Match newMatch = new Match();
        newMatch.setName("New Match");
        newMatch.setMatchState(MatchState.OPEN);
        when(this.matchService.saveMatch(any(Match.class))).thenReturn(newMatch);

        mockMvc.perform(post(BASE_URL).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newMatch)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(newMatch.getName()))
                .andExpect(jsonPath("$.matchState").value(newMatch.getMatchState().toString()));
    }

    @Test
    @WithMockUser("admin")
    void shouldUpdateMatchJoining() throws Exception {
        Match existingMatch = new Match();
        existingMatch.setId(TEST_MATCH_ID);
        existingMatch.setMatchState(MatchState.OPEN);
        existingMatch.setJoinedPlayers(new ArrayList<>()); 
        
        when(matchService.findMatchById(TEST_MATCH_ID)).thenReturn(existingMatch);
        when(matchService.saveMatch(any(Match.class))).thenAnswer(invocation -> invocation.getArgument(0));

        mockMvc.perform(put(BASE_URL + "/{id}/join", TEST_MATCH_ID)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("\"newPlayer\""))
                .andExpect(status().is(201))
                .andExpect(jsonPath("$.joinedPlayers", hasItem("newPlayer")));
    }
    
    @Test
    @WithMockUser("admin")
    void shouldSetMatchWinner() throws Exception {
        when(this.matchService.findMatchById(TEST_MATCH_ID)).thenReturn(match);
        when(this.matchService.saveMatch(any(Match.class))).thenReturn(match);

        mockMvc.perform(patch(BASE_URL + "/{id}/winner", TEST_MATCH_ID).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString("winner")))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.winner").value("winner"));
    }

    @Test
    @WithMockUser("admin")
    void shouldUpdateMatchStart() throws Exception {
        when(this.matchService.findMatchById(TEST_MATCH_ID)).thenReturn(match);
        when(this.matchService.saveMatch(any(Match.class))).thenReturn(match);

        mockMvc.perform(patch(BASE_URL + "/{id}/start", TEST_MATCH_ID).with(csrf())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.matchState").value(MatchState.IN_PROGRESS.toString()));
    }

    @Test
    @WithMockUser("admin")
    void shouldDeleteMatch() throws Exception {
        when(this.matchService.findMatchById(TEST_MATCH_ID)).thenReturn(match);
        doNothing().when(this.matchService).deleteMatch(TEST_MATCH_ID);

        mockMvc.perform(delete(BASE_URL + "/{id}", TEST_MATCH_ID).with(csrf()))
                .andExpect(status().isNoContent());
    }
}
