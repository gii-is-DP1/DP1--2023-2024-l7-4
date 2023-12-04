package org.springframework.samples.petclinic.player;



import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
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

    private Player keyo;

    @BeforeEach
    void setUp(){
        keyo = new Player();
        keyo.setTotal_bloqs(23);
        keyo.setTotal_score(12);
        keyo.setId(TEST_PLAYER_ID);

    }

    
}
