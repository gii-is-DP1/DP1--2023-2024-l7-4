package org.springframework.samples.petclinic.match.chat;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.match.messages.MatchChatMessage;
import org.springframework.samples.petclinic.match.messages.MatchMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/chats")
@Tag(name = "Chats", description = "The chats management API")
@SecurityRequirement(name = "bearerAuth")
public class ChatMessageRestController {

    private ChatMessageService chatMessageService;

    private MatchService matchService;

    public ChatMessageRestController(ChatMessageService chatMessageService, MatchService matchService) {
        this.chatMessageService = chatMessageService;
        this.matchService = matchService;
    }

    @GetMapping("/{matchId}")
    public List<ChatMessage> findAllChatMessagesByMatchId(@PathVariable("matchId") Integer matchId) {
        return chatMessageService.findAllByMatchId(matchId);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ChatMessage> create(@RequestBody @Valid MatchChatMessage matchChatMessage)
            throws URISyntaxException {
        ChatMessage newChatMessage = new ChatMessage();
        BeanUtils.copyProperties(matchChatMessage, newChatMessage, "id");
        newChatMessage.setMatch(matchService.findMatchById(matchChatMessage.getMatchId()));
        ChatMessage savedChatMessage = this.chatMessageService.save(newChatMessage);

        return new ResponseEntity<>(savedChatMessage, HttpStatus.CREATED);
    }

    @MessageMapping("/chat/{id}")
    @SendTo("/topic/chat/{id}")
    public MatchMessage particularMatchChatMessage(@DestinationVariable int id, MatchMessage message) {
        return new MatchMessage(message.getType(), message.getMessage());
    }

}