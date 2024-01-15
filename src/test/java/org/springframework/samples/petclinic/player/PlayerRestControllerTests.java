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

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Test class for {@link PlayerRestController}
 */


@WebMvcTest(value = { PlayerRestController.class,
		 }, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = WebSecurityConfigurer.class))
public class PlayerRestControllerTests {

    private static final int TEST_PLAYER_ID = 1;
	private static final String BASE_URL = "/api/v1/players";

    @SuppressWarnings("unused")
	@Autowired
	private PlayerRestController playerController;

    @MockBean
    private PlayerService playerService;

    
	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private MockMvc mockMvc;

    private Player paula;
    private Player claudia;
    private Player lucia;

    @BeforeEach
    void setUp(){
        paula = new Player();
        paula.setTotal_bloqs(23);
        paula.setTotal_score(12);
        paula.setId(TEST_PLAYER_ID);

        claudia = new Player();
        claudia.setTotal_bloqs(40);
        claudia.setTotal_score(15);
        claudia.setId(2);

        lucia = new Player();
        lucia.setTotal_bloqs(32);
        lucia.setTotal_score(7);
        lucia.setId(3);
    
    }

    @Test
	@WithMockUser("admin")
	void shouldFindAll() throws Exception {
		when(this.playerService.findAll()).thenReturn(List.of(paula, claudia, lucia));
		mockMvc.perform(get(BASE_URL)).andExpect(status().isOk()).andExpect(jsonPath("$.size()").value(3))
				.andExpect(jsonPath("$.size()").value(3));
	}

    @Test
	@WithMockUser("admin")
	void shouldReturnPlayer() throws Exception {
		when(this.playerService.findPlayer(TEST_PLAYER_ID)).thenReturn(paula);
		mockMvc.perform(get(BASE_URL +"/{id}", TEST_PLAYER_ID)).andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(TEST_PLAYER_ID))
				.andExpect(jsonPath("$.total_bloqs").value(paula.getTotal_bloqs()))
				.andExpect(jsonPath("$.total_score").value(paula.getTotal_score()));
	}

    @Test
	@WithMockUser("admin")
	void shouldReturnNotFoundPlayer() throws Exception {
		when(this.playerService.findPlayer(TEST_PLAYER_ID)).thenThrow(ResourceNotFoundException.class);
		mockMvc.perform(get(BASE_URL + "/{id}", TEST_PLAYER_ID)).andExpect(status().isNotFound());
	}

    @Test
	@WithMockUser("admin")
	void shouldCreatePlayer() throws Exception {
		Player player = new Player();
		player.setTotal_bloqs(23);
		player.setTotal_score(22);


		mockMvc.perform(post(BASE_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(player))).andExpect(status().isCreated());
	}

    @Test
	@WithMockUser("admin")
	void shouldUpdateOwner() throws Exception {


		when(this.playerService.findPlayer(TEST_PLAYER_ID)).thenReturn(paula);
		when(this.playerService.updatePlayer(any(Player.class), any(Integer.class))).thenReturn(paula);

		mockMvc.perform(put(BASE_URL + "/{id}", TEST_PLAYER_ID).with(csrf()).contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(paula))).andExpect(status().isOk());
	}

    @Test
	@WithMockUser("admin")
	void shouldReturnNotFoundUpdatePlayer() throws Exception {

		when(this.playerService.findPlayer(TEST_PLAYER_ID)).thenThrow(ResourceNotFoundException.class);
		when(this.playerService.updatePlayer(any(Player.class), any(Integer.class))).thenReturn(paula);

		mockMvc.perform(put(BASE_URL + "/{id}", TEST_PLAYER_ID).with(csrf()).contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(paula))).andExpect(status().isNotFound());
	}

    @Test
    @WithMockUser("admin")
    void shouldDeletePlayer() throws Exception {
        when(this.playerService.findPlayer(TEST_PLAYER_ID)).thenReturn(paula);

        doNothing().when(this.playerService).deletePlayer(TEST_PLAYER_ID);
        mockMvc.perform(delete(BASE_URL + "/{id}",TEST_PLAYER_ID).with(csrf())).andExpect(status().isOk());
    }

    
    
}
