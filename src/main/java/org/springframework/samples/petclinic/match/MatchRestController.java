package org.springframework.samples.petclinic.match;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.ipc.http.HttpSender.Response;
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
    public MatchRestController(MatchService matchService){
        this.matchService = matchService;
    }


    @GetMapping
	public ResponseEntity<List<Match>> findAll(@RequestParam(required = false, name = "open") boolean sorted) {
        if(sorted) return new ResponseEntity<>((List<Match>) this.matchService.findAllOpenList(), HttpStatus.OK);
        return new ResponseEntity<>((List<Match>) this.matchService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable("id") Integer id){
        return new ResponseEntity<>( matchService.findMatchById(id), HttpStatus.OK);
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
}
