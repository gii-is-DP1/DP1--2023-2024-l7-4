package org.springframework.samples.petclinic.match;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.board.GameBoard;
import org.springframework.samples.petclinic.board.GameBoardRepository;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.samples.petclinic.territory.Territory;
import org.springframework.web.bind.annotation.GetMapping;
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
    private GameBoardRepository gameBoardRepository;
    private PlayerService playerService;

    @Autowired
    public MatchRestController(MatchService matchService, GameBoardRepository gameBoardRepository, PlayerService playerService){
        this.matchService = matchService;
        this.gameBoardRepository = gameBoardRepository;
        this.playerService = playerService;
    }

    @GetMapping
	public ResponseEntity<List<Match>> findAll(@RequestParam(required = false, name = "open") boolean sorted) {
        if(sorted) return new ResponseEntity<>((List<Match>) this.matchService.findAllOpenList(), HttpStatus.OK);
        return new ResponseEntity<>((List<Match>) matchService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
	public ResponseEntity<Match> findById(@PathVariable(name = "id") int id) {
        return new ResponseEntity<>(matchService.findMatchById(id), HttpStatus.OK);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Match> create(@RequestBody @Valid Match match) throws URISyntaxException {
        Match newMatch = new Match();
        BeanUtils.copyProperties(match, newMatch, "id", "matchState", "nRounds");
        newMatch.setMatchState(MatchState.OPEN);
        newMatch.setNRounds(0);
        Match savedMatch = this.matchService.saveMatch(newMatch);

        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }
    //FUNCION PARA JOIN

    @PutMapping("/{id}/join")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Match> updateMatchJoining(@PathVariable("id") Integer id, @RequestBody String username) {
        Match m = matchService.findMatchById(id);
        List<String> joinedPlayers = m.getJoinedPlayers();
        username = username.replace("\"", "");
        if(!joinedPlayers.contains(username))
            joinedPlayers.add(username);
        if(m.getMatchState() == MatchState.OPEN){
            m.setJoinedPlayers(joinedPlayers);
            if(joinedPlayers.size()==m.getMaxPlayers())
                m.setMatchState(MatchState.IN_PROGRESS);
        }
        Match savedMatch = matchService.saveMatch(m);
        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }




/// FUNCION DE GUARDADO DE TABLEROS

    @PostMapping("/{matchId}/{username}/saveBoard")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveBoard(@PathVariable("matchId") Integer matchId, @PathVariable("username") String username, @RequestBody @Valid Set<Territory> territories){
        Match m = matchService.findMatchById(matchId);
        Player p = playerService.findByUsername(username);
        GameBoard newGb = new GameBoard();
        newGb.setTerritories(territories);
        newGb.setMatch(m);
        newGb.setPlayer(p);    
    }
}
