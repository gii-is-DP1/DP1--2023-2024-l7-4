package org.springframework.samples.petclinic.request;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(RequestRestController.class)
class RequestRestControllerTests {

    private static final String BASE_URL = "/api/v1/requests";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RequestService requestService;

    @MockBean
    private PlayerService playerService;

    @Autowired
    private ObjectMapper objectMapper;

    private Request request;
    private Request request2;
    private Player playerOne;
    private Player playerTwo;

    @BeforeEach
    void setup() {
      
        playerOne = new Player();
        playerOne.setUsername("player1");
        playerOne.setName("Player One");

        playerTwo = new Player();
        playerTwo.setUsername("player2");
        playerTwo.setName("Player Two");

        request = new Request();
        request.setId(1);
        request.setPlayerOne(playerOne);
        request.setPlayerTwo(playerTwo);
        request.setStatus(RequestState.PENDING);

        request2 = new Request();
        request.setId(2);
        request.setPlayerOne(new Player());
        request.setPlayerTwo(new Player());
        request.setStatus(RequestState.PENDING);
    }

    @Test
    @WithMockUser("admin")
    void testGetAllRequests() throws Exception {
        List<Request> requests = Arrays.asList(request);
        when(requestService.findAll()).thenReturn(requests);

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    @WithMockUser("admin")
    void testFindRequestById() throws Exception {
        when(requestService.findRequestById(1)).thenReturn(request);

        mockMvc.perform(get(BASE_URL + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @WithMockUser(username = "admin")
    void testFindReceivedRequest() throws Exception {
        when(requestService.findRecievedRequest(1)).thenReturn(List.of(request, request2));
        mockMvc.perform(get(BASE_URL + "/1/received"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser("admin")
    void testCreateRequest() throws Exception {
        Request req = new Request();
        req.setStatus(RequestState.PENDING);
        req.setPlayerOne(new Player());
        req.setPlayerTwo(new Player());

        mockMvc.perform(post(BASE_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req))).andExpect(status().isCreated());
    }


    @Test
    @WithMockUser("admin")
    void should_Accept_Request() throws Exception {
        when(requestService.findRequestById(1)).thenReturn(request);
        when(requestService.saveRequest(any(Request.class))).thenReturn(request);

        mockMvc.perform(put(BASE_URL + "1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser("admin")
    void testDeleteRequest() throws Exception {
        when(this.requestService.findRequestById(1)).thenReturn(request);
        
        doNothing().when(this.requestService).rejectRequest(request);
        mockMvc.perform(delete(BASE_URL + "/{id}", 1).with(csrf()))
                .andExpect(status().isNoContent());
    }
}