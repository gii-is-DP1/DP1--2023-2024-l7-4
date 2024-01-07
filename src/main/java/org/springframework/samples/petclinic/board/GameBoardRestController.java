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

            if(critery.contains("A2")){
                score += gbService.getScoreCriteryA2(newGb);
            }
            if(critery.contains("A3")){
                score += gbService.getScoreCriteryA3(newGb);
            }
            if(critery.contains("A4")){
                score += gbService.getScoreCriteryA4(newGb);
            }
            if(critery.contains("A5")){
                score += gbService.getScoreCriteryA5(newGb);
            }
            if(critery.contains("A6")){
                score += gbService.getScoreCriteryA6(newGb);
            }
            if(critery.contains("B1")){
                score += gbService.getScoreCriteryB1(newGb);
            }
            if(critery.contains("B2")){
                score += gbService.getScoreCriteryB2(newGb);
            }
            if(critery.contains("B3")){
                score += gbService.getScoreCriteryB3(newGb);
            }
            if(critery.contains("B4")){
                score += gbService.getScoreCriteryB4(newGb);
            }
            if(critery.contains("B5")){
                score += gbService.getScoreCriteryB5(newGb);
            }
            if(critery.contains("B6")){
                score += gbService.getScoreCriteryB6(newGb);
            }

        }
        return score;
    }

    @PostMapping("/{matchId}/{username}/{critery}")
    public Integer getScoreBoard(@PathVariable("matchId") Integer matchId, @PathVariable("username") String username,@PathVariable("critery") String critery, @RequestBody @Valid Set<Territory> territories){
        Match m = matchService.findMatchById(matchId);
        Player p = playerService.findByUsername(username);
        GameBoard newGb = new GameBoard();
        newGb.setTerritories(territories);
        newGb.setMatch(m);
        newGb.setPlayer(p);
        Integer score = 0;
        for (String criteria: m.getScoreCrit()){
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryA1(newGb);
            }
           if(criteria.contains(critery)){
                score += gbService.getScoreCriteryA2(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryA3(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryA4(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryA5(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryA6(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryB1(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryB2(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryB3(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryB4(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryB5(newGb);
            }
            if(criteria.contains(critery)){
                score += gbService.getScoreCriteryB6(newGb);
            }

        }
        return score;
    }

    


