package org.springframework.samples.petclinic.player;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/players")
@SecurityRequirement(name = "bearerAuth")
public class PlayerRestController {

    private final PlayerService playerService;

    @Autowired
    public PlayerRestController(PlayerService playerService, UserService userService) {
        this.playerService = playerService;
    }

    @GetMapping
	public List<Player> findAll() {
		return playerService.findAll();
	}

    @GetMapping(value = "{playerId}")
	public Player findById(@PathVariable("playerId") int id) {
		Player p = playerService.findPlayer(id);
		if(p == null) {
			throw new ResourceNotFoundException("No existe el jugador con id: " + id);
		}
		return p;
	}	

	@PostMapping()
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Player> create(@RequestBody @Valid Player player) throws URISyntaxException {
		Player newPlayer = new Player();
		BeanUtils.copyProperties(player, newPlayer, "id");
		Player savedPlayer = this.playerService.savePlayer(newPlayer);

		return new ResponseEntity<>(savedPlayer, HttpStatus.CREATED);
	}

	@PutMapping(value = "{playerId}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Player> update(@PathVariable("playerId") int playerId, @RequestBody @Valid Player player) {
		RestPreconditions.checkNotNull(playerService.findPlayer(playerId), "Player", "ID", playerId);
		return new ResponseEntity<>(this.playerService.updatePlayer(player, playerId), HttpStatus.OK);
	}
}
