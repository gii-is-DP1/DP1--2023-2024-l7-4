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
import org.springframework.samples.petclinic.gameRequests.GameRequest;
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
        request2.setId(2);
        request2.setPlayerOne(new Player());
        request2.setPlayerTwo(new Player());
        request2.setStatus(RequestState.PENDING);
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

        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setPlayerOne("1");
        requestDTO.setPlayerTwo("2");
        requestDTO.setStatus("PENDING");
        

        Player playerOne = new Player();
        playerOne.setId(1);

        Player playerTwo = new Player();
        playerTwo.setId(2);

        when(playerService.findByUsername(requestDTO.getPlayerOne())).thenReturn(playerOne);
        when(playerService.findByUsername(requestDTO.getPlayerTwo())).thenReturn(playerTwo);

        request.setId(1);

        when(requestService.saveRequest(any(Request.class))).thenReturn(request);

       mockMvc.perform(post(BASE_URL)
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(requestDTO))
        .with(csrf()))
        .andExpect(status().isCreated()) 
        .andExpect(jsonPath("$.id").value(1));
    }


    @Test
    @WithMockUser("admin")
    void should_Update_Request() throws Exception {

        Request updatedRequest = new Request();
        updatedRequest.setId(1);
        updatedRequest.setStatus(RequestState.ACCEPTED);

        when(requestService.findRequestById(1)).thenReturn(request);
        when(requestService.saveRequest(any(Request.class))).thenReturn(updatedRequest);

    mockMvc.perform(put(BASE_URL + "/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(updatedRequest))
        .with(csrf()))
        .andExpect(status().isOk());
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