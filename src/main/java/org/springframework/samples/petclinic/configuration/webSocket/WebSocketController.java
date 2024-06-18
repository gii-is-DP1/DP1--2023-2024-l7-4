package org.springframework.samples.petclinic.configuration.webSocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    
    @MessageMapping("/messages")
    @SendTo("/topic/messages")
    public ChatMessage chat(ChatMessage message){
        return new ChatMessage(message.getMessage(), message.getUser());
    }
}
