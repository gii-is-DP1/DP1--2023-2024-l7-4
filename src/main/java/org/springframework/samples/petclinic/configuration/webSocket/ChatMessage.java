package org.springframework.samples.petclinic.configuration.webSocket;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatMessage {
    
    String message;
    String user;
}
