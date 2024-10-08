package org.springframework.samples.petclinic.player;

import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

import java.util.Set;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.auth.payload.response.MessageResponse;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.request.RequestService;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	private final MatchService matchService;
	private final RequestService requestService;

	@Autowired
	public PlayerRestController(PlayerService playerService, UserService userService, RequestService requestService,
			MatchService matchService) {
		this.playerService = playerService;
		this.matchService = matchService;
		this.requestService = requestService;
	}

	@GetMapping
	public ResponseEntity<List<Player>> findAll() {
		return new ResponseEntity<>((List<Player>) this.playerService.findAll(), HttpStatus.OK);
	}

	@GetMapping(value = "{id}")
	public ResponseEntity<Player> findById(@PathVariable("id") Integer id) {
		return new ResponseEntity<>(playerService.findPlayer(id), HttpStatus.OK);
	}

	@GetMapping(value = "/username/{id}")
	public ResponseEntity<Player> findByUsername(@PathVariable("id") String username) {
		return new ResponseEntity<>(playerService.findByUsername(username), HttpStatus.OK);
	}

	@GetMapping("/{id}/friends")
	public ResponseEntity<Set<Player>> getFriends(@PathVariable("id") Integer id) {
		Set<Player> friends = requestService.getFriends(id);
		return new ResponseEntity<>(friends, HttpStatus.OK);
	}

	@GetMapping("/{id}/friends/online")
	public ResponseEntity<Set<Player>> getFriendsOnline(@PathVariable("id") Integer id) {
		Set<Player> friends = requestService.getFriendsOnline(id);
		return new ResponseEntity<>(friends, HttpStatus.OK);
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

	@DeleteMapping(value = "{username}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<MessageResponse> delete(@PathVariable("username") String username) {
		RestPreconditions.checkNotNull(playerService.findByUsername(username), "Player", "username", username);
		List<Match> matchesToDelete = matchService.findMatchsByPlayer(username);
		matchService.deleteMatches(matchesToDelete);
		playerService.deletePlayer(username);
		return new ResponseEntity<>(new MessageResponse("Player deleted!"), HttpStatus.OK);
	}

	@GetMapping("/public")
	public ResponseEntity<List<PlayerListDTO>> listAllPlayers() {
    	List<Player> players = playerService.findAll();
    	List<PlayerListDTO> playerDTOs = players.stream().map(player -> {
        	PlayerListDTO dto = new PlayerListDTO();
			dto.setUsername(player.getUsername());
        	dto.setNickname(player.getNickname());
        	dto.setAvatar(player.getAvatar());
        	return dto;
    	}).collect(Collectors.toList());
    
    	return new ResponseEntity<>(playerDTOs, HttpStatus.OK);
	}

	@GetMapping(value = "/public/{username}")
	public ResponseEntity<PlayerDetailDTO> getPlayerDetails(@PathVariable("username") String username) {
    	Player player = playerService.findByUsername(username);

		if (player == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

    	PlayerDetailDTO dto = new PlayerDetailDTO();
		dto.setNickname(player.getNickname());
    	dto.setAvatar(player.getAvatar());
    	dto.setBiography(player.getBiography());
    	dto.setLocation(player.getLocation());
    	dto.setBirthdate(player.getBirthdate());
    	dto.setFavoriteGenres(player.getFavoriteGenres());
    	dto.setFavoritePlatforms(player.getFavoritePlatforms());
    	dto.setFavoriteSagas(player.getFavoriteSagas());
		dto.setProfileType(player.getProfileType());

    	return new ResponseEntity<>(dto, HttpStatus.OK);
	}

}
