package org.springframework.samples.petclinic.match;

import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.samples.petclinic.configuration.services.NotificationService;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.gunfighter.GunfighterService;
import org.springframework.samples.petclinic.match.messages.MatchDeckMessage;
import org.springframework.samples.petclinic.match.messages.MatchMessage;
import org.springframework.samples.petclinic.match.messages.TypeMessage;
import org.springframework.samples.petclinic.player.PlayerService;
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
    private PlayerService playerService;
    private GunfighterService gunfighterService;
    private NotificationService notificationService;

    @Autowired
    public MatchRestController(MatchService matchService, GunfighterService gunfighterService,
            PlayerService playerService, NotificationService notificationService) {
        this.matchService = matchService;
        this.gunfighterService = gunfighterService;
        this.playerService = playerService;
        this.notificationService = notificationService;

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
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Match> updateMatchJoining(@PathVariable("id") Integer id, @RequestBody String username)
            throws NotFoundException {
        Match m = matchService.findMatchById(id);
        List<String> joinedPlayers = m.getJoinedPlayers();
        username = username.replace("\"", "");
        if (!joinedPlayers.contains(username) && joinedPlayers.size() < 2)
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

    @PatchMapping("/{id}/winner")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Match> setMatchWinner(@PathVariable("id") Integer id, @RequestBody String username) {
        Match m = matchService.findMatchById(id);
        username = username.replace("\"", "");
        m.setWinner(username);
        if (m.getMatchState() == MatchState.IN_PROGRESS)
            m.setMatchState(MatchState.CLOSED);
        m.setFinishDateTime(LocalDateTime.now());
        m.setStartDate(m.getStartDate());
        Match savedMatch = matchService.saveMatch(m);
        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/start")
    public ResponseEntity<Match> updateMatchStart(@PathVariable("id") Integer id) {
        Match m = matchService.findMatchById(id);
        if (m == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (m.getMatchState() == MatchState.OPEN) {
            m.setMatchState(MatchState.IN_PROGRESS);
            m.setStartDate(LocalDateTime.now());
            m.setFinishDateTime(null);

            Gunfighter gunfighter0 = new Gunfighter();
            gunfighter0.setPlayerNumber(0);
            gunfighter0.setPlayer(playerService.findByUsername(m.getJoinedPlayers().get(0)));
            gunfighter0.setMatch(m);

            Gunfighter gunfighter1 = new Gunfighter();
            gunfighter1.setPlayerNumber(1);
            gunfighter1.setPlayer(playerService.findByUsername(m.getJoinedPlayers().get(1)));
            gunfighter1.setMatch(m);

            matchService.initialDeal(m, gunfighter0, gunfighter1);

            Match savedMatch = matchService.saveMatch(m);
            gunfighterService.save(gunfighter0);
            gunfighterService.save(gunfighter1);

            return new ResponseEntity<>(savedMatch, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
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
    public MatchMessage particularInfoGameMessage(@DestinationVariable int id, MatchMessage message) {
        return new MatchMessage(message.getType(), message.getMessage());
    }

    @MessageMapping("/match/{id}/cards")
    @SendTo("/topic/match/{id}/cards")
    public MatchDeckMessage particularGameMessage(@DestinationVariable int id, MatchDeckMessage deckMessage) {
        Match match = matchService.findMatchById(id);
        Gunfighter gunfighter0 = gunfighterService.findByMatchAndGunfighter(id, 0);
        Gunfighter gunfighter1 = gunfighterService.findByMatchAndGunfighter(id, 1);

        if (deckMessage.getType() == TypeMessage.READY) {
            return new MatchDeckMessage(deckMessage.getType(), match.getDeck(), gunfighter0.getCards(),
                    gunfighter1.getCards(), gunfighter0.getCardPlayed(), gunfighter1.getCardPlayed());
        }
        if (deckMessage.getType() == TypeMessage.DECKS) {

            match.setDeck(deckMessage.getDeckCards());
            matchService.saveMatch(match);

            if (deckMessage.getPlayer1Cards().size() == 0) {
                gunfighter0.setCards(deckMessage.getPlayer0Cards());
                gunfighterService.save(gunfighter0);
                return new MatchDeckMessage(deckMessage.getType(), match.getDeck(), gunfighter0.getCards(),
                        List.of(), gunfighter0.getCardPlayed(), gunfighter1.getCardPlayed());
            } else {
                gunfighter1.setCards(deckMessage.getPlayer1Cards());
                gunfighterService.save(gunfighter1);
                return new MatchDeckMessage(deckMessage.getType(), match.getDeck(), List.of(),
                        gunfighter1.getCards(), gunfighter0.getCardPlayed(), gunfighter1.getCardPlayed());
            }

        }
        if (deckMessage.getType() == TypeMessage.PLAYEDCARD) {

            if (deckMessage.getPlayedCard0() != -1) {
                if (deckMessage.getPlayedCard0() == 30 && deckMessage.getPlayer0Cards().size() > 0) {
                    gunfighter0.setPreventDamage(true);
                }
                gunfighter0.setCardPlayed(deckMessage.getPlayedCard0());
                gunfighterService.save(gunfighter0);
            } else {
                if (deckMessage.getPlayedCard1() == 30 && deckMessage.getPlayer1Cards().size() > 0) {
                    gunfighter1.setPreventDamage(true);
                }
                gunfighter1.setCardPlayed(deckMessage.getPlayedCard1());
                gunfighterService.save(gunfighter1);
            }

            MatchDeckMessage message = new MatchDeckMessage(TypeMessage.PLAYEDCARD, List.of(), List.of(), List.of(),
                    deckMessage.getPlayedCard0(), deckMessage.getPlayedCard1());

            notificationService.sendMessage("/topic/match/" + id + "/cards", message);

            if (gunfighter0.getCardPlayed() != -1 && gunfighter1.getCardPlayed() != -1) {

                matchService.actionCards(match, gunfighter0, gunfighter1);
                matchService.saveMatch(match);
                gunfighterService.resetState(gunfighter0);
                gunfighterService.resetState(gunfighter1);

                return new MatchDeckMessage(TypeMessage.PLAYERINFO, match.getDeck(), List.of(), List.of(), -1,
                        -1);
            } else {
                return null;
            }
        }
        return new MatchDeckMessage(deckMessage.getType(), match.getDeck(), gunfighter0.getCards(),
                gunfighter1.getCards(), gunfighter0.getCardPlayed(), gunfighter1.getCardPlayed());

    }

    // LOGROS

    @GetMapping("/juegaTuPrimeraPartida/{id}")
    public Boolean juegaTuPrimeraPartida(@PathVariable("id") Integer id) {
        return matchService.juegaTuPrimeraPartida(id);
    }

    @GetMapping("/juega5partidas/{id}")
    public Boolean juega5partidas(@PathVariable("id") Integer id) {
        return matchService.juega5partidas(id);
    }

    @GetMapping("/ganaPrimeraPartida/{id}")
    public Boolean ganaPrimeraPartida(@PathVariable("id") Integer id) {
        return matchService.ganaPrimeraPartida(id);
    }

    @GetMapping("/gana5partidas/{id}")
    public Boolean gana5partidas(@PathVariable("id") Integer id) {
        return matchService.gana5partidas(id);
    }

    // PERSONAL

    @GetMapping("/winMatches/{id}")
    public Integer findWinMatchByPlayer(@PathVariable("id") Integer id) {
        return matchService.findWinMatchsByPlayer(id);
    }

    @GetMapping("/timePlayed/{id}")
    public Double timePlayedByUserName(@PathVariable("id") Integer id) {
        return matchService.timePlayedByUserName(id);
    }

    @GetMapping("/maxTimePlayed/{username}")
    public Double maxTimePlayedByUserName(@PathVariable("username") Integer username) {
        return matchService.maxTimePlayedByUserName(username);
    }

    @GetMapping("/minTimePlayed/{username}")
    public Double minTimePlayedByUserName(@PathVariable("username") Integer username) {
        return matchService.minTimePlayedByUserName(username);
    }

    @GetMapping("/avgTimePlayed/{username}")
    public Double averageTimePlayedByUserName(@PathVariable("username") Integer username) {
        return matchService.averageTimePlayedByUserName(username);
    }

}