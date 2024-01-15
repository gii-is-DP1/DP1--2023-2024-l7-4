package org.springframework.samples.petclinic.match;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.samples.petclinic.configuration.SecurityConfiguration;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;

/**
 * Test class for {@link MatchRestController}
 *
 */

@WebMvcTest(value = MatchRestController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = WebSecurityConfigurer.class), excludeAutoConfiguration = SecurityConfiguration.class)
class MatchRestControllerTests {

    private static final int TEST_MATCH_ID = 1;
    private static final String BASE_URL = "/api/v1/matches/";

    @SuppressWarnings("unused")
    @Autowired
    private MatchRestController matchController;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MatchService matchService;

    @Autowired
	private ObjectMapper objectMapper;

    private Match match1;

    private Match match2;

    private Match match3;

    @BeforeEach
    void setup() {
        match1 = new Match();
        match1.setId(TEST_MATCH_ID);
        match1.setName("Match1");
        match1.setNRounds(7);
        match1.setMatchTime(70);
        match1.setMaxPlayers(4);
        match1.setScoreCrit(List.of("A1","B2"));
        match1.setWinner(null);
        
        match2 = new Match();
        match2.setId(2);
        match2.setName("Match2");
        match2.setNRounds(7);
        match2.setMatchTime(70);
        match2.setMaxPlayers(4);
        match2.setScoreCrit(List.of("A1","B2"));
        match2.setWinner(null);

        match3 = new Match();
        match3.setId(3);
        match3.setName("Match3");
        match3.setNRounds(7);
        match3.setMatchTime(70);
        match3.setMaxPlayers(4);
        match3.setScoreCrit(List.of("A1","B2"));
        match3.setWinner(null);


    }


    @Test
    @WithMockUser("admin")
    void shouldFindAllMatches() throws Exception {
    when(this.matchService.findAll()).thenReturn(List.of(match1, match2, match3));
    mockMvc.perform(get(BASE_URL)).andExpect(status().isOk()).andExpect(jsonPath("$.size()").value(3))
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].name").value("Match1"))  
            .andExpect(jsonPath("$[1].id").value(2))
            .andExpect(jsonPath("$[1].name").value("Match2"))  
            .andExpect(jsonPath("$[2].id").value(3))
            .andExpect(jsonPath("$[2].name").value("Match3")); 
}

    @Test
    @WithMockUser("admin")
    void shouldReturnMatch() throws Exception {
        when(this.matchService.findMatchById(TEST_MATCH_ID)).thenReturn(match1);
        mockMvc.perform(get(BASE_URL + "/{id}", TEST_MATCH_ID)).andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(TEST_MATCH_ID));

    }

    @Test
	@WithMockUser("admin")
	void shouldReturnNotFoundMatch() throws Exception {
		when(this.matchService.findMatchById(TEST_MATCH_ID)).thenThrow(ResourceNotFoundException.class);
		mockMvc.perform(get(BASE_URL + "/{id}", TEST_MATCH_ID)).andExpect(status().isNotFound());
	}

    @Test
	@WithMockUser("admin")
	void shouldCreateMatch() throws Exception {
		Match match = new Match();
        match.setId(TEST_MATCH_ID);
        match.setName("Match1");
        match.setNRounds(7);
        match.setMatchTime(70);
        match.setMaxPlayers(4);
        match.setScoreCrit(List.of("A1","B2"));
        match.setWinner(null);

        mockMvc.perform(post(BASE_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(match))).andExpect(status().isCreated());
	}

    @Test
	@WithMockUser("admin")
	  void shouldDeleteMatch() throws Exception {
		when(this.matchService.findMatchById(TEST_MATCH_ID)).thenReturn(match1);
		
	    doNothing().when(this.matchService).deleteMatch(TEST_MATCH_ID);
	    mockMvc.perform(delete(BASE_URL + "/{id}", TEST_MATCH_ID).with(csrf()))
	         .andExpect(status().isOk());
	  }

   


}