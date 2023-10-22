package org.springframework.samples.petclinic.player;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.exceptions.AccessDeniedException;
import org.springframework.samples.petclinic.pet.Pet;
import org.springframework.samples.petclinic.user.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/players")
@Tag(name = "Players", description = "The player management API")
@SecurityRequirement(name = "bearerAuth")
public class PlayerRestController {
    
    private PlayerService playerService;

    @Autowired
    public PlayerRestController(PlayerService playerService){
        this.playerService = playerService;
    }


    @GetMapping
	public ResponseEntity<List<Player>> findAll() {
        return new ResponseEntity<>((List<Player>) this.playerService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/sorted")
	public ResponseEntity<List<Player>> sortedPlayers() {
        return new ResponseEntity<>((List<Player>) this.playerService.sortedPlayersByPuntuation(), HttpStatus.OK);
    }

}
