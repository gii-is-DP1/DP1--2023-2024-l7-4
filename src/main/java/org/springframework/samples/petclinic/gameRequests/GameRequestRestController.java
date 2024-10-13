package org.springframework.samples.petclinic.gameRequests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchService;
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

@RestController
@RequestMapping("/api/v1/gameRequests")

public class GameRequestRestController {
    private final GameRequestService gameRequestService;
    private final PlayerService playerService;
    private final MatchService matchService;

    @Autowired
    public GameRequestRestController(GameRequestService gameRequestService, PlayerService playerService,
            MatchService matchService) {
        this.gameRequestService = gameRequestService;
        this.playerService = playerService;
        this.matchService = matchService;
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
        List<GameRequest> requests = gameRequestService.findAll();

        for (GameRequest r : requests) {
            if (r.getMatchId() == Integer.parseInt(gameRequestDTO.getMatchId())
                    && r.getPlayerOne().getId().equals(Integer.parseInt(gameRequestDTO.getPlayerOne()))
                    && r.getPlayerTwo().getId().equals(Integer.parseInt(gameRequestDTO.getPlayerTwo()))
                    && r.getType().toString() == gameRequestDTO.getType()) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        Player playerOne = playerService.findPlayer(Integer.parseInt(gameRequestDTO.getPlayerOne()));
        Player playerTwo = playerService.findPlayer(Integer.parseInt(gameRequestDTO.getPlayerTwo()));
        Match m = matchService.findMatchById(Integer.parseInt(gameRequestDTO.getMatchId()));

        System.out.println("Player One: " + playerOne);
        System.out.println("Player Two: " + playerTwo);

        if (playerOne == null || playerTwo == null) {
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("------------" + gameRequestDTO.getType());
        GameRequest newRequest = new GameRequest();
        newRequest.setPlayerOne(playerOne);
        newRequest.setPlayerTwo(playerTwo);
        newRequest.setStatus(GameRequestStatus.PENDING);
        newRequest.setType(
                gameRequestDTO.getType().contains("player") ? GameRequestType.PLAYER : GameRequestType.ESPECTATOR);
        newRequest.setMatchId(m.getId());

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
        updatedGameRequest.setType(g.getType());
        return new ResponseEntity<>(this.gameRequestService.acceptRequest(updatedGameRequest, gameRequestId),
                HttpStatus.OK);
    }

    @DeleteMapping(value = "{gameRequestId}")
    public ResponseEntity<Void> delete(@PathVariable("gameRequestId") Integer gameRequestId) {
        this.gameRequestService.rejectRequest(gameRequestService.findById(gameRequestId));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}