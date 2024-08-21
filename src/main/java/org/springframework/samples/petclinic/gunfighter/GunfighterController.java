package org.springframework.samples.petclinic.gunfighter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.samples.petclinic.match.messages.MatchDeckMessage;
import org.springframework.samples.petclinic.match.messages.MatchMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/gunfighters")
@Tag(name = "Gunfighters", description = "The match management API")
@SecurityRequirement(name = "bearerAuth")
public class GunfighterController {

    private GunfighterService gunfighterService;

    @Autowired
    public GunfighterController(GunfighterService gunfighterService) {
        this.gunfighterService = gunfighterService;
    }

    @GetMapping("/{matchId}/{gunfighterId}")
    public ResponseEntity<Gunfighter> getInfoGunfighterByMatch(@PathVariable(name = "matchId") Integer matchId,
            @PathVariable(name = "gunfighterId") Integer gunfighterId) {
        return new ResponseEntity<>(gunfighterService.findByMatchAndGunfighter(matchId, gunfighterId), HttpStatus.OK);

    }

    @MessageMapping("/match/{id}/gunfighter")
    @SendTo("/topic/match/{id}/gunfighter")
    public MatchDeckMessage particularInfoGameMessage(@DestinationVariable int id, MatchDeckMessage message) {
        return new MatchDeckMessage(null, null, null, null, id, id);
    }
}
