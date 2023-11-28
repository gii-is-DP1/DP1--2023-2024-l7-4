package org.springframework.samples.petclinic.match;

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
import org.springframework.context.annotation.ComponentScan;
import org.springframework.samples.petclinic.configuration.SecurityConfiguration;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.context.annotation.FilterType;


@WebMvcTest(value = MatchRestController.class, 
    excludeFilters = @ComponentScan.Filter(type=FilterType.ASSIGNABLE_TYPE,classes = WebSecurityConfigurer.class),
excludeAutoConfiguration = SecurityConfiguration.class)
class MatchRestControllerTests {

    private static final int TEST_MATCH_ID = 1;
    private static final String BASE_URL = "/api/v1/matches/";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MatchService matchService;

    @MockBean
    private PlayerService playerService;


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
        match1.setScoreCrit(List.of("1","2"));
        match1.setWinner(null);
        
        match2 = new Match();
        match2.setId(2);
        match2.setName("Match2");
        match2.setNRounds(7);
        match2.setMatchTime(70);
        match2.setMaxPlayers(4);
        match2.setScoreCrit(List.of("1","2"));
        match2.setWinner(null);

        match3 = new Match();
        match3.setId(3);
        match3.setName("Match3");
        match3.setNRounds(7);
        match3.setMatchTime(70);
        match3.setMaxPlayers(4);
        match3.setScoreCrit(List.of("1","2"));
        match3.setWinner(null);


    }


    @Test
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



}