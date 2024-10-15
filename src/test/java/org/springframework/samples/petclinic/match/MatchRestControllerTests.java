package org.springframework.samples.petclinic.match;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.gunfighter.GunfighterService;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.samples.petclinic.player.ProfileType;
import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.samples.petclinic.configuration.services.NotificationService;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(value = MatchRestController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = WebSecurityConfigurer.class))
class MatchRestControllerTests {

        private static final String BASE_URL = "/api/v1/matches";

        @SuppressWarnings("unused")
        @Autowired
        private MatchRestController matchController;

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private MatchService matchService;

        @MockBean
        private PlayerService playerService;

        @MockBean
        private GunfighterService gunfighterService;

        @MockBean
        private NotificationService notificationService;

        @Autowired
        private ObjectMapper objectMapper;

        private Match match;

        private Match match2;

        private Player player1;

        private Player player2;

        @BeforeEach
        void setup() {
                List<String> joinedPlayers = new ArrayList<>();
                joinedPlayers.add("player1");
                match = new Match();
                match.setId(1);
                match.setMatchState(MatchState.OPEN);
                match.setJoinedPlayers(joinedPlayers);

                List<String> joinedPlayers2 = new ArrayList<>();
                joinedPlayers2.add("player2");
                match2 = new Match();
                match2.setId(2);
                match2.setMatchState(MatchState.OPEN);
                match2.setJoinedPlayers(joinedPlayers2);

                player1 = new Player();
                player1.setUsername("player1");
                player1.setPassword("player1");
                player1.setName("Name");
                player1.setSurname("Surname");
                player1.setNickname("nickname1");
                player1.setAvatar("avatar.png");
                player1.setEmail("player1@gmail.com");
                player1.setLocation("Madrid");
                player1.setProfileType(ProfileType.CASUAL);

                player2 = new Player();
                player2.setUsername("player2");
                player2.setPassword("player2");
                player2.setName("Name");
                player2.setSurname("Surname");
                player2.setNickname("nickname2");
                player2.setAvatar("avatar.png");
                player2.setEmail("player2@gmail.com");
                player2.setLocation("London");
                player2.setProfileType(ProfileType.HARDCORE);

                Authorities playerAuth = new Authorities();
                playerAuth.setId(2);
                playerAuth.setAuthority("PLAYER");
                player1.setAuthority(playerAuth);
                player2.setAuthority(playerAuth);
        }

        @Test
        @WithMockUser("admin")
        void testFindAllMatches() throws Exception {
                List<Match> matches = Arrays.asList(match);
                when(matchService.findAll()).thenReturn(matches);

                mockMvc.perform(get("/api/v1/matches"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id").value(1));
        }

        @Test
        @WithMockUser("admin")
        void testFindMatchById() throws Exception {
                when(matchService.findMatchById(1)).thenReturn(match);

                mockMvc.perform(get("/api/v1/matches/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1));
        }

        @Test
        @WithMockUser("admin")
        void testFindMatchesByUsername() throws Exception {
                List<Match> matches = Arrays.asList(match);
                when(matchService.findMatchsByPlayer("player1")).thenReturn(matches);

                mockMvc.perform(get(BASE_URL + "/player/player1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id").value(1));
        }

        @Test
        @WithMockUser("admin")
        void testCreateMatchWithCasualPlayer() throws Exception {
                player1.setGamesPlayedToday(1);
                player1.setLastGameDate(LocalDate.now());

                when(playerService.findByUsername("player1")).thenReturn(player1);
                when(matchService.saveMatch(any(Match.class))).thenReturn(match);

                match.setName("New Match");

                mockMvc.perform(post(BASE_URL)
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(match)))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.id").value(1));

                assertEquals(2, player1.getGamesPlayedToday());
                verify(playerService).savePlayer(player1);
        }

        @Test
        @WithMockUser("admin")
        void testCreateMatchWithTooManyGamesToday() throws Exception {
                player1.setGamesPlayedToday(2);
                player1.setLastGameDate(LocalDate.now());

                when(playerService.findByUsername("player1")).thenReturn(player1);

                match.setName("New Match");
                match.setJoinedPlayers(List.of("player1"));

                mockMvc.perform(post(BASE_URL)
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(match)))
                                .andExpect(status().isForbidden());
        }

        @Test
        @WithMockUser("admin")
        void testCreateMatchWithHardcorePlayerWithTwoGamesCreated() throws Exception {
                player2.setGamesPlayedToday(2);
                player2.setLastGameDate(LocalDate.now());

                when(playerService.findByUsername("player2")).thenReturn(player2);
                when(matchService.saveMatch(any(Match.class))).thenReturn(match2);

                match2.setName("New Match");
                match2.setJoinedPlayers(List.of("player2"));

                mockMvc.perform(post(BASE_URL)
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(match2)))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.id").value(2));

                assertEquals(3, player2.getGamesPlayedToday());
                verify(playerService).savePlayer(player2);
        }

        @Test
        @WithMockUser("admin")
        void testCreateMatchWithInvalidMatchData() throws Exception {
                match.setName(null);

                when(playerService.findByUsername("player1")).thenReturn(player1);

                mockMvc.perform(post(BASE_URL)
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(match)))
                                .andExpect(status().isBadRequest());
        }

        @Test
        @WithMockUser("admin")
        void testJoinMatch() throws Exception {
                when(matchService.findMatchById(1)).thenReturn(match);
                when(matchService.saveMatch(any(Match.class))).thenReturn(match);

                mockMvc.perform(put("/api/v1/matches/1/join")
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("\"player2\""))
                                .andExpect(status().isCreated());
        }

        @Test
        @WithMockUser("admin")
        void testUnjoinMatch() throws Exception {
                when(matchService.findMatchById(1)).thenReturn(match);
                when(matchService.saveMatch(any(Match.class))).thenReturn(match);

                mockMvc.perform(put("/api/v1/matches/1/unjoin")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(csrf())
                                .content("\"player1\""))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.id").value(1));
        }

        @Test
        @WithMockUser("admin")
        void testSetMatchWinner() throws Exception {
                when(matchService.findMatchById(1)).thenReturn(match);
                when(matchService.saveMatch(any(Match.class))).thenReturn(match);

                mockMvc.perform(patch("/api/v1/matches/1/winner")
                                .with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("\"player1\""))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.id").value(1));
        }

        @Test
        @WithMockUser("admin")
        void testUpdateMatchStart() throws Exception {
                match.setJoinedPlayers(List.of("player1", "player2"));

                Gunfighter gunfighter0 = new Gunfighter();
                gunfighter0.setPlayerNumber(0);
                gunfighter0.setPlayer(player1);
                gunfighter0.setMatch(match);

                Gunfighter gunfighter1 = new Gunfighter();
                gunfighter1.setPlayerNumber(1);
                gunfighter1.setPlayer(player2);
                gunfighter1.setMatch(match);

                when(matchService.findMatchById(1)).thenReturn(match);
                when(playerService.findByUsername("player1")).thenReturn(player1);
                when(playerService.findByUsername("player2")).thenReturn(player2);
                when(matchService.saveMatch(any(Match.class))).thenReturn(match);
                when(gunfighterService.save(any(Gunfighter.class))).thenReturn(gunfighter0).thenReturn(gunfighter1);

                mockMvc.perform(patch("/api/v1/matches/1/start").with(csrf()))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.matchState").value("IN_PROGRESS"))
                                .andExpect(jsonPath("$.id").value(1));

                Mockito.verify(matchService).initialDeal(any(Match.class), any(Gunfighter.class),
                                any(Gunfighter.class));
                Mockito.verify(gunfighterService, Mockito.times(2)).save(any(Gunfighter.class));
        }

        @Test
        @WithMockUser("admin")
        void testDeleteMatch() throws Exception {
                player1.setGamesPlayedToday(1);

                when(matchService.findMatchById(1)).thenReturn(match);
                when(playerService.findByUsername("player1")).thenReturn(player1);
                doNothing().when(matchService).deleteMatch(1);

                mockMvc.perform(delete(BASE_URL + "/{id}", 1).with(csrf()))
                                .andExpect(status().isNoContent());

                assertEquals(0, player1.getGamesPlayedToday());
                verify(playerService).savePlayer(player1);
                verify(matchService).deleteMatch(1);
        }

        @Test
        @WithMockUser("admin")
        void testDeleteMatchNotFound() throws Exception {
                when(matchService.findMatchById(1)).thenReturn(null);

                mockMvc.perform(delete(BASE_URL + "/{id}", 1).with(csrf()))
                                .andExpect(status().isNotFound());
        }

        @Test
        @WithMockUser("admin")
        void testFindWinMatchesPublic() throws Exception {
                Integer winMatches = 5;

                when(matchService.findWinMatchsPublic("player1")).thenReturn(winMatches);

                mockMvc.perform(get(BASE_URL + "/winMatchesPublic/{username}", "player1"))
                                .andExpect(status().isOk())
                                .andExpect(content().string("5"));

                verify(matchService).findWinMatchsPublic("player1");
        }

        @Test
        @WithMockUser("admin")
        void testTimePlayedPublic() throws Exception {
                Double timePlayed = 120.5;

                when(matchService.timePlayedPublic("player1")).thenReturn(timePlayed);

                mockMvc.perform(get(BASE_URL + "/timePlayedPublic/{username}", "player1"))
                                .andExpect(status().isOk())
                                .andExpect(content().string("120.5"));

                verify(matchService).timePlayedPublic("player1");
        }

        @Test
        @WithMockUser("admin")
        void testMaxTimePlayedPublic() throws Exception {
                Double maxTimePlayed = 150.0;

                when(matchService.maxTimePlayedPublic("player1")).thenReturn(maxTimePlayed);

                mockMvc.perform(get(BASE_URL + "/maxTimePlayedPublic/{username}", "player1"))
                                .andExpect(status().isOk())
                                .andExpect(content().string("150.0"));

                verify(matchService).maxTimePlayedPublic("player1");
        }

        @Test
        @WithMockUser("admin")
        void testMinTimePlayedPublic() throws Exception {

                Double minTimePlayed = 45.0;

                when(matchService.minTimePlayedPublic("player1")).thenReturn(minTimePlayed);

                mockMvc.perform(get(BASE_URL + "/minTimePlayedPublic/{username}", "player1"))
                                .andExpect(status().isOk())
                                .andExpect(content().string("45.0"));

                verify(matchService).minTimePlayedPublic("player1");
        }

        @Test
        @WithMockUser("admin")
        void testAverageTimePlayedPublic() throws Exception {

                Double avgTimePlayed = 30.0;

                when(matchService.averageTimePlayedPublic("player1")).thenReturn(avgTimePlayed);

                mockMvc.perform(get(BASE_URL + "/avgTimePlayedPublic/{username}", "player1"))
                                .andExpect(status().isOk())
                                .andExpect(content().string("30.0"));

                verify(matchService).averageTimePlayedPublic("player1");
        }

        @Test
        @WithMockUser("admin")
        void testAverageTimePlayedPublic1() throws Exception {

                Double avgTimePlayed = 30.0;

                when(matchService.averageTimePlayedPublic("player1")).thenReturn(avgTimePlayed);

                mockMvc.perform(get(BASE_URL + "/avgTimePlayedPublic/{username}", "player1"))
                                .andExpect(status().isOk())
                                .andExpect(content().string("30.0"));

                verify(matchService).averageTimePlayedPublic("player1");
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testFindWinMatchByPlayer() throws Exception {
                when(matchService.findWinMatchsByPlayer(1)).thenReturn(3);

                mockMvc.perform(get(BASE_URL + "/winMatches/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").value(3));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testTimePlayedByUserName() throws Exception {
                when(matchService.timePlayedByUserName(1)).thenReturn(120.);

                mockMvc.perform(get(BASE_URL + "/timePlayed/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").value(120.));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testMaxTimePlayedByUserName() throws Exception {
                when(matchService.maxTimePlayedByUserName(1)).thenReturn(300.);

                mockMvc.perform(get(BASE_URL + "/maxTimePlayed/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").value(300.));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testMinTimePlayedByUserName() throws Exception {
                when(matchService.minTimePlayedByUserName(1)).thenReturn(30.);

                mockMvc.perform(get(BASE_URL + "/minTimePlayed/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").value(30.));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testAverageTimePlayedByUserName() throws Exception {
                when(matchService.averageTimePlayedByUserName(1)).thenReturn(150.0);

                mockMvc.perform(get(BASE_URL + "/avgTimePlayed/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").value(150.0));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testMaxPlayerPlayed() throws Exception {
                String maxPlayer = "player2";
                Map<String, String> response = new HashMap<>();
                response.put("maxPlayer", maxPlayer);
                when(matchService.maxPlayerPlayedByUserName(1)).thenReturn(response);

                mockMvc.perform(get(BASE_URL + "/maxPlayerPlayed/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.maxPlayer").value("player2"));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testMaxCardPlayed() throws Exception {
                Integer maxCard = 1;
                Map<String, Integer> response = new HashMap<>();
                response.put("maxCard", maxCard);
                when(matchService.maxCardPlayedByUserName(1)).thenReturn(response);

                mockMvc.perform(get(BASE_URL + "/maxCardPlayed/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.maxCard").value(1));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testMaxWinnerPlayer() throws Exception {
                Integer maxWinnerPlayer = 1;
                Map<String, Integer> response = new HashMap<>();
                response.put("maxWinnerPlayer", maxWinnerPlayer);

                when(matchService.maxWinnerPlayer()).thenReturn(response);

                mockMvc.perform(get(BASE_URL + "/winners"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.maxWinnerPlayer").value(1));
        }

        @Test
        @WithMockUser(value = "player", authorities = { "PLAYER" })
        void testMaxTimePlayer() throws Exception {
                Double maxTime = 120.;
                Map<String, Double> response = new HashMap<>();
                response.put("maxTimePlayer", maxTime);

                when(matchService.maxTimePlayer()).thenReturn(response);

                mockMvc.perform(get(BASE_URL + "/timePlayed"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.maxTimePlayer").value(120.));
        }

}
