package org.springframework.samples.petclinic.board;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.samples.petclinic.territory.Territory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/boards")
@Tag(name = "Boards", description = "The player management API")
@SecurityRequirement(name = "bearerAuth")
public class GameBoardRestController {

    private GameBoardService gbService;
    private MatchService matchService;
    private PlayerService playerService;

    @Autowired
    public GameBoardRestController(GameBoardService gbService, MatchService matchService, PlayerService playerService){
        this.gbService = gbService;
        this.matchService = matchService;
        this.playerService = playerService;
    }


    @PostMapping("/{matchId}/{username}")
    public Integer getScoreBoard(@PathVariable("matchId") Integer matchId, @PathVariable("username") String username, @RequestBody @Valid Set<Territory> territories){
        Match m = matchService.findMatchById(matchId);
        Player p = playerService.findByUsername(username);
        GameBoard newGb = new GameBoard();
        newGb.setTerritories(territories);
        newGb.setMatch(m);
        newGb.setPlayer(p);
        gbService.save(newGb);
        Integer score = 0;
        for (String critery: m.getScoreCrit()){
            if(critery.contains("A1")){
                score += gbService.getScoreCriteryA1(newGb);
            }

        }
        return score;
    }

    

}