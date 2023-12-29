package org.springframework.samples.petclinic.match;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;



@RunWith(SpringRunner.class)
//@DataJpaTest(includeFilters = {@ComponentScan.Filter(Service.class),@ComponentScan.Filter(PasswordEncoder.class)})
@SpringBootTest
@AutoConfigureTestDatabase
public class MatchServiceTests {

    private MatchService matchService;

	@Autowired
	public MatchServiceTests(MatchService matchService) {
		this.matchService = matchService;
	}

	@Test
	void shouldFindAllMatches() {
		List<Match> matches = (List<Match>) this.matchService.findAll();
		assertEquals(0, matches.size());
	}

	@Test
	void shouldNotFindSingleOwnerWithBadID() {
		assertThrows(ResourceNotFoundException.class, () -> this.matchService.findMatchById(100));
	}

	@Test
	void shouldFindMatchByPlayer() {
		List<Match> match = this.matchService.findMatchsByPlayer("danfercab");
		assertEquals(List.of(), match);
	}


	@Test
	void shouldFindMatchClosedByPlayer() {
		List<Match> match = this.matchService.findMatchsClosedByPlayer("danfercab");
		assertEquals(List.of(), match);
	}

	@Test
	void shouldFindAllOpenList() {
		List<Match> match = this.matchService.findAllOpenList();
		assertEquals(List.of(), match);
	}

	
	@Test
	void shouldFindGameBoardByPlayerId() {
		assertThrows(ResourceNotFoundException.class, () -> this.matchService.findGameBoardByPlayerId(100));
	}
	

	@Test
	@Transactional
	void shouldDeleteMatch() throws DataAccessException {
		Integer firstCount = ((Collection<Match>) matchService.findAll()).size();

		Match match = new Match();
		match.setId(5);
		match.setScoreCrit(List.of("1","2"));
		match.setWinner("Seco");
		match.setJoinedPlayers(List.of("manuel", "cabra"));
		match.setMaxPlayers(5);
		match.setMatchTime(15);
		match.setCreator(new Player());
		match.setName("seco");
		matchService.saveMatch(match);

		Integer secondCount = ((Collection<Match>) matchService.findAll()).size();
		assertEquals(firstCount + 1, secondCount);
		matchService.deleteMatch(match.getId());
		Integer lastCount = ((Collection<Match>) matchService.findAll()).size();
		assertEquals(firstCount, lastCount);
	}
}
