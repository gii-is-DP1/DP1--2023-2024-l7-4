package org.springframework.samples.petclinic.match;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/matches")
@Tag(name = "Matches", description = "The match management API")
@SecurityRequirement(name = "bearerAuth")
public class MatchRestController {

    private MatchService matchService;

    @Autowired
    public MatchRestController(MatchService matchService) {
        this.matchService = matchService;

    }

    @GetMapping
    public ResponseEntity<List<Match>> findAll(@RequestParam(required = false, name = "open") boolean sorted) {
        if (sorted)
            return new ResponseEntity<>((List<Match>) this.matchService.findAllOpenList(), HttpStatus.OK);
        return new ResponseEntity<>((List<Match>) matchService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> findById(@PathVariable(name = "id") int id) {
        return new ResponseEntity<>(matchService.findMatchById(id), HttpStatus.OK);
    }

    @GetMapping("/player/{username}")
    public ResponseEntity<List<Match>> findAllByUsername(@PathVariable(name = "username") String username) {
            return new ResponseEntity<>((List<Match>) this.matchService.findMatchsByPlayer(username), HttpStatus.OK);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Match> create(@RequestBody @Valid Match match) throws URISyntaxException {
        Match newMatch = new Match();
        BeanUtils.copyProperties(match, newMatch, "id", "matchState");
        newMatch.setMatchState(MatchState.OPEN);
        Match savedMatch = this.matchService.saveMatch(newMatch);

        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }
    // FUNCION PARA JOIN

    @PutMapping("/{id}/join")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Match> updateMatchJoining(@PathVariable("id") Integer id, @RequestBody String username) {
        Match m = matchService.findMatchById(id);
        List<String> joinedPlayers = m.getJoinedPlayers();
        username = username.replace("\"", "");
        if (!joinedPlayers.contains(username))
            joinedPlayers.add(username);
        if (m.getMatchState() == MatchState.OPEN)
            m.setJoinedPlayers(joinedPlayers);
        Match savedMatch = matchService.saveMatch(m);
        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/unjoin")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Match> updateMatchUnjoining(@PathVariable("id") Integer id, @RequestBody String username) {
        Match m = matchService.findMatchById(id);
        List<String> joinedPlayers = m.getJoinedPlayers();
        username = username.replace("\"", "");
        if (joinedPlayers.contains(username))
            joinedPlayers.remove(username);
        if (m.getMatchState() == MatchState.OPEN)
            m.setJoinedPlayers(joinedPlayers);
        Match savedMatch = matchService.saveMatch(m);
        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }

    /*
     * @PutMapping("/{id}/winner")
     * 
     * @ResponseStatus(HttpStatus.CREATED)
     * 
     */
    @PatchMapping("/{id}/start")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Match> updateMatchStart(@PathVariable("id") Integer id) {
        Match m = matchService.findMatchById(id);
        if (m.getMatchState() == MatchState.OPEN)
            m.setMatchState(MatchState.IN_PROGRESS);
        Match savedMatch = matchService.saveMatch(m);
        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable(name = "id") int id) {
        matchService.deleteMatch(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @MessageMapping("/match/messages")
    @SendTo("/topic/match/messages")
    public MatchMessage matchMessage(MatchMessage message) {
        return new MatchMessage(message.getType(), message.getMessage());
    }

    @MessageMapping("/match/{id}/messages")
    @SendTo("/topic/match/{id}/messages")
    public MatchMessage particularMatchMessage(@DestinationVariable int id, MatchMessage message) {
        return new MatchMessage(message.getType(), message.getMessage());
    }

    @MessageMapping("/match/{id}/game")
    @SendTo("/topic/match/{id}/game")
    public MatchMessage particularGameMessage(@DestinationVariable int id, MatchMessage message) {
        return new MatchMessage(message.getType(), message.getMessage());
    }

    @MessageMapping("/match/{id}/cards")
    @SendTo("/topic/match/{id}/cards")
    public MatchDeckMessage particularGameMessage(@DestinationVariable int id, MatchDeckMessage deckMessage) {
        return new MatchDeckMessage(deckMessage.getType(), deckMessage.getDeckCards(),
                deckMessage.getPlayer0Cards(), deckMessage.getPlayer1Cards(), deckMessage.getPlayedCard0(),
                deckMessage.getPlayedCard1());
    }

    @MessageMapping("/match/{id}/players")
    @SendTo("/topic/match/{id}/players")
    public MatchGunfighterMessage particularGamePlayerMessage(@DestinationVariable int id,
            MatchGunfighterMessage playerMessage) {
        return new MatchGunfighterMessage(playerMessage.getType(), playerMessage.getHealth(),
                playerMessage.getBullets(),
                playerMessage.getPrecision(), playerMessage.getPlayerNumber());
    }

    @MessageMapping("/match/{id}/actions")
    @SendTo("/topic/match/{id}/actions")
    public MatchActionsPlayersMessage particularGameActionMessage(@DestinationVariable int id,
            MatchActionsPlayersMessage actionMessage) {
        return new MatchActionsPlayersMessage(actionMessage.getAction(), actionMessage.getPlayerNumber());
    }
}