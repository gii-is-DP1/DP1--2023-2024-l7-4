package org.springframework.samples.petclinic.round;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.net.URISyntaxException;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.samples.petclinic.auth.payload.response.MessageResponse;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/v1/rounds")
@Tag(name = "Rounds", description = "The round management API")
@SecurityRequirement(name = "bearerAuth")
public class RoundRestController {
    
    private RoundService roundService;

    @Autowired
    public RoundRestController(RoundService roundService){
        this.roundService = roundService;
    }


	@GetMapping("/{matchId}/{round}")
	public ResponseEntity<Round> getRound(@PathVariable("matchId") Integer matchId, @PathVariable("round") Integer subRound){
		return new ResponseEntity<>(roundService.findRoundByMatchRound(matchId, subRound), HttpStatus.OK);
	}

	@PostMapping()
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Round> create(@RequestBody @Valid Round round) throws URISyntaxException {
		Round newRound = new Round();
		BeanUtils.copyProperties(round, newRound, "id");
		Round savedRound = this.roundService.saveRound(newRound);
		return new ResponseEntity<>(savedRound, HttpStatus.CREATED);
	}

	@PutMapping(value = "{roundId}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Round> update(@PathVariable("roundId") int roundId, @RequestBody @Valid Round round) {
		RestPreconditions.checkNotNull(roundService.findRoundById(roundId), "Round", "ID", roundId);
		return new ResponseEntity<>(this.roundService.updateRound(round, roundId), HttpStatus.OK);
	}

	@DeleteMapping(value = "{roundId}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<MessageResponse> delete(@PathVariable("roundId") int id) {
		RestPreconditions.checkNotNull(roundService.findRoundById(id), "Round", "ID", id);
		roundService.deleteRound(id);
		return new ResponseEntity<>(new MessageResponse("Round deleted!"), HttpStatus.OK);
	}
}