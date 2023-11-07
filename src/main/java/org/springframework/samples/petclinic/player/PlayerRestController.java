package org.springframework.samples.petclinic.player;


// import org.springframework.samples.petclinic.match.Match;
// import org.springframework.samples.petclinic.match.MatchService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.net.URISyntaxException;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.samples.petclinic.auth.payload.response.MessageResponse;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/players")
@Tag(name = "Players", description = "The player management API")
@SecurityRequirement(name = "bearerAuth")
public class PlayerRestController {
    
    private PlayerService playerService;
	private MatchService matchService;

    @Autowired
    public PlayerRestController(PlayerService playerService ,MatchService matchService){
        this.playerService = playerService;
		this.matchService = matchService;
    }


    @GetMapping
	public ResponseEntity<List<Player>> findAll(@RequestParam(required = false, name = "sorted") boolean sorted) {
        if(sorted) return new ResponseEntity<>((List<Player>) this.playerService.sortedPlayersByPuntuation(), HttpStatus.OK);
        else return new ResponseEntity<>((List<Player>) this.playerService.findAll(), HttpStatus.OK);
    }

	@GetMapping(value = "{id}")
	public ResponseEntity<Player> findById(@PathVariable("id") Integer id) {
		return new ResponseEntity<>(playerService.findPlayer(id), HttpStatus.OK);
	}

	@GetMapping(value = "/username/{id}")
	public ResponseEntity<Player> findByUsername(@PathVariable("id") String username) {
		return new ResponseEntity<>(playerService.findByUsername(username), HttpStatus.OK);
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

	@DeleteMapping(value = "{playerId}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<MessageResponse> delete(@PathVariable("playerId") int id) {
		RestPreconditions.checkNotNull(playerService.findPlayer(id), "Player", "ID", id);
		playerService.deletePlayer(id);
		return new ResponseEntity<>(new MessageResponse("Player deleted!"), HttpStatus.OK);
	}
   
	@GetMapping(value = "/{username}/myMatches")
	public ResponseEntity<List<Match>> findMyMatches(@RequestParam(required = false, name = "closed") boolean closed,@PathVariable String username) {
		if(closed) return new ResponseEntity<>((List<Match>) matchService.findAll(), HttpStatus.OK);
		else return new ResponseEntity<>((List<Match>) matchService.findAll(), HttpStatus.OK);
	}
 

}
