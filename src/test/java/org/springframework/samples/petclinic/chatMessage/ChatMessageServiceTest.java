package org.springframework.samples.petclinic.chatMessage;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.chat.ChatMessage;
import org.springframework.samples.petclinic.match.chat.ChatMessageRepository;
import org.springframework.samples.petclinic.match.chat.ChatMessageService;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
public class ChatMessageServiceTest {

    @Mock
    private ChatMessageRepository chatMessageRepository;

    @InjectMocks
    private ChatMessageService chatMessageService;

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
    void testFindAllByMatchId() {
        when(chatMessageRepository.findAllByMatchId(1)).thenReturn(List.of(chatMessage1, chatMessage2, chatMessage3));
        List<ChatMessage> chatMessages = chatMessageService.findAllByMatchId(1);
        assertEquals(3, chatMessages.size());
    }

    @Test
    void testSave() {
        when(chatMessageRepository.save(chatMessage1)).thenReturn(chatMessage1);
        ChatMessage chatMessage = chatMessageService.save(chatMessage1);
        assertNotNull(chatMessage);
        assertEquals(1, chatMessage.getId());

    }

}
