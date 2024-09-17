package org.springframework.samples.petclinic.gameRequests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
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

import jakarta.validation.Valid;

import java.net.URISyntaxException;
import java.util.List;

@RequestMapping("/api/v1/gameRequests")
@RestController
public class GameRequestRestController {
    private final GameRequestService gameRequestService;
    private final PlayerService playerService;

    @Autowired
    public GameRequestRestController(GameRequestService gameRequestService, PlayerService playerService) {
        this.gameRequestService = gameRequestService;
        this.playerService = playerService;
    }

    @GetMapping
    public ResponseEntity<List<GameRequest>> getAllRequests() {
        return new ResponseEntity<>((List<GameRequest>) this.gameRequestService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<GameRequest> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(gameRequestService.findById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/received")
    public ResponseEntity<List<GameRequest>> findReceivedRequest(@PathVariable("id") Integer id) {
        List<GameRequest> pendingRequests = gameRequestService.findRecievedGameRequest(id);
        return new ResponseEntity<>(pendingRequests, HttpStatus.OK);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<GameRequest> create(@RequestBody @Valid GameRequestDTO gameRequestDTO)
            throws URISyntaxException {
        System.out.println("------------------------------------ RequestDTO: " +
                gameRequestDTO);

        if (gameRequestDTO.getPlayerOne() == null || gameRequestDTO.getPlayerTwo() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Player playerOne = playerService.findByUsername(gameRequestDTO.getPlayerOne());
        Player playerTwo = playerService.findByUsername(gameRequestDTO.getPlayerTwo());

        System.out.println("Player One: " + playerOne);
        System.out.println("Player Two: " + playerTwo);

        if (playerOne == null || playerTwo == null) {
            return ResponseEntity.badRequest().body(null);
        }

        GameRequest newRequest = new GameRequest();
        newRequest.setPlayerOne(playerOne);
        newRequest.setPlayerTwo(playerTwo);
        newRequest.setStatus(GameRequestStatus.PENDING);

        GameRequest savedRequest = gameRequestService.saveRequest(newRequest);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @PutMapping(value = "{gameRequestId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<GameRequest> update(@PathVariable("gameRequestId") Integer gameRequestId,
            @RequestBody @Valid GameRequest updatedGameRequest) throws URISyntaxException {
        GameRequest g = gameRequestService.findById(gameRequestId);
        RestPreconditions.checkNotNull(gameRequestService.findById(gameRequestId), "GameRequest", "ID", gameRequestId);
        updatedGameRequest.setMatchId(g.getMatchId());
        updatedGameRequest.setPlayerOne(g.getPlayerOne());
        updatedGameRequest.setPlayerTwo(g.getPlayerTwo());
        updatedGameRequest.setStatus(GameRequestStatus.ACCEPTED);
        return new ResponseEntity<>(this.gameRequestService.acceptRequest(updatedGameRequest, gameRequestId),
                HttpStatus.OK);
    }

    @DeleteMapping(value = "{gameRequestId}")
    public ResponseEntity<Void> delete(@PathVariable("gameRequestId") Integer gameRequestId) {
        this.gameRequestService.rejectRequest(gameRequestService.findById(gameRequestId));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}