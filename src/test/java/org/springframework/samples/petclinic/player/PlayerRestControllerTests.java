package org.springframework.samples.petclinic.player;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.request.RequestService;
import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(value = PlayerRestController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = WebSecurityConfigurer.class))
class PlayerRestControllerTests {

    private static final int TEST_PLAYER_ID = 1;
    private static final String BASE_URL = "/api/v1/players";

    @Autowired
    private PlayerRestController playerController;

    @MockBean
    private PlayerService playerService;

    @MockBean
    private UserService userService;

    @MockBean
    private MatchService matchService;

    @MockBean
    private RequestService requestService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    private Player john;
    private Authorities authorities;

    @BeforeEach
    void setup() {
        authorities = new Authorities();
        authorities.setAuthority("PLAYER");

        john = new Player();
        john.setId(TEST_PLAYER_ID);
        john.setUsername("john.doe");
        john.setPassword("password");
        john.setAuthority(authorities);
        john.setName("John");
        john.setSurname("Doe");
        john.setAvatar("avatar.png");
        john.setNickname("johndoe");
        john.setEmail("john.doe@example.com");
        john.setBiography("Hello, this is my biography");
        john.setBirthdate(LocalDate.of(1990, 5, 20));
        john.setLocation("London");
        john.setFavoriteGenres("Action");
        john.setFavoritePlatforms("HBO");
        john.setFavoriteSagas("Star Wars");
        john.setProfileType(ProfileType.HARDCORE);
        john.setGamesPlayedToday(1);
        john.setLastGameDate(LocalDate.of(2024, 9, 20));
    }

    @Test
    @WithMockUser("admin")
    void shouldFindAllPlayers() throws Exception {
        when(playerService.findAll()).thenReturn(List.of(john));
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].name").value(john.getName()))
                .andExpect(jsonPath("$[0].username").value(john.getUsername()));
    }

    @Test
    @WithMockUser("admin")
    void shouldFindPlayerById() throws Exception {
        when(playerService.findPlayer(TEST_PLAYER_ID)).thenReturn(john);
        mockMvc.perform(get(BASE_URL + "/{id}", TEST_PLAYER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TEST_PLAYER_ID))
                .andExpect(jsonPath("$.name").value(john.getName()))
                .andExpect(jsonPath("$.username").value(john.getUsername()));
    }

    @Test
    @WithMockUser("admin")
    void shouldCreatePlayer() throws Exception {
        Player newPlayer = new Player();
        newPlayer.setUsername("jane.doe");
        newPlayer.setPassword("password");
        newPlayer.setAuthority(authorities);
        newPlayer.setName("Jane");
        newPlayer.setSurname("Doe");
        newPlayer.setAvatar("avatar2.png");
        newPlayer.setNickname("janedoe");
        newPlayer.setEmail("jane.doe@example.com");

        when(playerService.savePlayer(any(Player.class))).thenReturn(newPlayer);

        mockMvc.perform(post(BASE_URL).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPlayer)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Jane"))
                .andExpect(jsonPath("$.username").value("jane.doe"));
    }

    @Test
    @WithMockUser("admin")
    void shouldUpdatePlayer() throws Exception {
        john.setName("UpdatedName");
        john.setSurname("UpdatedSurname");
        when(playerService.findPlayer(TEST_PLAYER_ID)).thenReturn(john);
        when(playerService.updatePlayer(any(Player.class), any(Integer.class))).thenReturn(john);

        mockMvc.perform(put(BASE_URL + "/{playerId}", TEST_PLAYER_ID).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(john)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("UpdatedName"))
                .andExpect(jsonPath("$.surname").value("UpdatedSurname"));
    }

    @Test
    @WithMockUser("admin")
    void shouldDeletePlayer() throws Exception {
        when(playerService.findByUsername("johndoe")).thenReturn(john);
        doNothing().when(playerService).deletePlayer("johndoe");
        doNothing().when(matchService).deleteMatches(any(List.class));

        mockMvc.perform(delete(BASE_URL + "/{username}", "johndoe").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Player deleted!"));
    }

    @Test
    @WithMockUser("admin")
    void shouldListAllPlayers() throws Exception {
        PlayerListDTO johnDTO = new PlayerListDTO();
        johnDTO.setUsername(john.getUsername());
        johnDTO.setNickname(john.getNickname());
        johnDTO.setAvatar(john.getAvatar());

        when(playerService.findAll()).thenReturn(List.of(john));

        mockMvc.perform(get(BASE_URL + "/public"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].username").value(johnDTO.getUsername()))
                .andExpect(jsonPath("$[0].nickname").value(johnDTO.getNickname()))
                .andExpect(jsonPath("$[0].avatar").value(johnDTO.getAvatar()));
    }

    @Test
    @WithMockUser("admin")
    void shouldReturnEmptyListWhenNoPlayersExist() throws Exception {
        
        when(playerService.findAll()).thenReturn(List.of());

        mockMvc.perform(get(BASE_URL + "/public"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty()); 
    }

    @Test
    @WithMockUser("admin")
    void shouldGetPlayerDetails() throws Exception {

        when(playerService.findByUsername(john.getUsername())).thenReturn(john);

        mockMvc.perform(get(BASE_URL + "/public/{username}", john.getUsername()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value(john.getNickname()))
                .andExpect(jsonPath("$.avatar").value(john.getAvatar()))
                .andExpect(jsonPath("$.biography").value(john.getBiography()))
                .andExpect(jsonPath("$.location").value(john.getLocation()))
                .andExpect(jsonPath("$.birthdate").value(john.getBirthdate().toString()))
                .andExpect(jsonPath("$.favoriteGenres").value(john.getFavoriteGenres()))
                .andExpect(jsonPath("$.favoritePlatforms").value(john.getFavoritePlatforms()))
                .andExpect(jsonPath("$.favoriteSagas").value(john.getFavoriteSagas()))
                .andExpect(jsonPath("$.profileType").value(john.getProfileType().toString()));
    }

    @Test
    @WithMockUser("admin")
    void shouldReturnNotFoundWhenPlayerDoesNotExist() throws Exception {
        String nonExistentUsername = "nonexistentuser";

        when(playerService.findByUsername(nonExistentUsername)).thenReturn(null);

        mockMvc.perform(get(BASE_URL + "/public/{username}", nonExistentUsername))
                .andExpect(status().isNotFound());
    }

}