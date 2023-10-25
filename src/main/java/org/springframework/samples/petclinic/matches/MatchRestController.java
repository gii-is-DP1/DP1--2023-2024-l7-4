package org.springframework.samples.petclinic.match;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.auth.payload.response.MessageResponse;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.ipc.http.HttpSender.Response;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/matchs")
@Tag(name = "Matchs", description = "The match management API")
@SecurityRequirement(name = "bearerAuth")
public class MatchRestController {
    
    private MatchService matchService;

    @Autowired
    public MatchRestController(MatchService matchService){
        this.matchService=matchService;
    }

    @GetMapping
    public ResponseEntity<List<Match>> findAll(){
        return new ResponseEntity<>((List<Match>) matchService.findAll(), HttpStatus.OK);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Match> create(@RequestBody @Valid Match match) throws URISyntaxException{
        Match newMatch = new Match();
        BeanUtils.copyProperties(match, newMatch, "id");
        Match savedMatch = matchService.saveMatch(newMatch);
        return new ResponseEntity<>(savedMatch, HttpStatus.CREATED);
    }

    @PutMapping(value = "{matchId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Match> update(@PathVariable("matchId") int matchId, @RequestBody @Valid Match match) {
        RestPreconditions.checkNotNull(matchService.findMatchById(matchId), "Match", "ID", matchId);
        return new ResponseEntity<>(matchService.updateMatch(match, matchId), HttpStatus.OK);
    }

    @DeleteMapping(value = "{matchId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MessageResponse> delete(@PathVariable("matchId") int id){
        RestPreconditions.checkNotNull(matchService.findMatchById(id), "Match  ", "ID", id);
        matchService.deleteMatch(id);
        return new ResponseEntity<>(new MessageResponse("Match deleted!"), HttpStatus.OK);
    }   


}
