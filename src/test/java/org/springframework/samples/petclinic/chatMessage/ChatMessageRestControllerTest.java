package org.springframework.samples.petclinic.chatMessage;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.match.chat.ChatMessage;
import org.springframework.samples.petclinic.match.chat.ChatMessageRestController;
import org.springframework.samples.petclinic.match.chat.ChatMessageService;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.samples.petclinic.match.Match;


@WebMvcTest(controllers = ChatMessageRestController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class ChatMessageRestControllerTest {

    private static final String BASE_URL = "/api/v1/chats";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChatMessageService chatMessageService;

    @MockBean
    private MatchService matchService;

    @MockBean
    private PlayerService playerService;

    @MockBean
    private UserService userService;

    private ChatMessage chatMessage1;
    private ChatMessage chatMessage2;
    private ChatMessage chatMessage3;

    @BeforeEach
    void setup() {
        chatMessage1 = new ChatMessage();
        chatMessage1.setId(1);
        chatMessage1.setMatch(new Match());
        chatMessage1.setPlayerNumber(1);
        chatMessage1.setMessage("Hello");

        chatMessage2 = new ChatMessage();
        chatMessage2.setId(2);
        chatMessage2.setMatch(new Match());
        chatMessage2.setPlayerNumber(2);
        chatMessage2.setMessage("Hi");

        chatMessage3 = new ChatMessage();
        chatMessage3.setId(3);
        chatMessage3.setMatch(new Match());
        chatMessage3.setPlayerNumber(3);
        chatMessage3.setMessage("Hey");

    }

    @Test
    @WithMockUser(username = "admin")
    void testFindAllChatMessagesByMatchId() throws Exception {
        when(chatMessageService.findAllByMatchId(1)).thenReturn(List.of(chatMessage1, chatMessage2, chatMessage3));
        mockMvc.perform(get(BASE_URL + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    @WithMockUser(username = "admin")
    void testCreate() throws Exception {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setId(1);
        chatMessage.setMatch(new Match());
        chatMessage.setPlayerNumber(1);
        chatMessage.setMessage("Hello");

        when(matchService.findMatchById(1)).thenReturn(new Match());
        when(chatMessageService.save(any(ChatMessage.class))).thenReturn(chatMessage);

        mockMvc.perform(post(BASE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(chatMessage))
                .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

}
