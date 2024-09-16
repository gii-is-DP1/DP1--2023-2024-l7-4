package org.springframework.samples.petclinic.match;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Collection;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
// @DataJpaTest(includeFilters =
// {@ComponentScan.Filter(Service.class),@ComponentScan.Filter(PasswordEncoder.class)})
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
		assertEquals(3, matches.size());
	}

	@Test
	void shouldNotFindSingleMatchWithBadID() {
		assertThrows(ResourceNotFoundException.class, () -> this.matchService.findMatchById(100));
	}

	@Test
	void shouldFindSingleMatchById() {
		Match m = this.matchService.findMatchById(1);
		assertEquals("Match 1", m.getName());
	}

	@Test
	void shouldFindMatchByPlayer() {
		List<Match> matches = this.matchService.findMatchsByPlayer("Player1");
		assertEquals(3, matches.size());
	}

	@Test
	void shouldFindMatchClosedByPlayer() {

		List<Match> matches = this.matchService.findMatchsClosedByPlayer("Player1");
		assertEquals(1, matches.size());
	}

	@Test
	void shouldFindAllOpenList() {

		List<Match> matches = this.matchService.findAllOpenList();
		assertEquals(1, matches.size());
	}

	@Test
	@Transactional
	void shouldDeleteMatch() throws DataAccessException {

		Integer firstCount = ((Collection<Match>) matchService.findAll()).size();

		matchService.deleteMatch(1);

		Integer lastCount = ((Collection<Match>) matchService.findAll()).size();
		assertEquals(firstCount - 1, lastCount);
	}

	@Test
	@Transactional
	void shouldDeleteMatches() throws DataAccessException {

		Integer firstCount = ((Collection<Match>) matchService.findAll()).size();
		Match match2 = this.matchService.findMatchById(2);
		Match match3 = this.matchService.findMatchById(3);

		matchService.deleteMatches(List.of(match2, match3));

		Integer lastCount = ((Collection<Match>) matchService.findAll()).size();
		assertEquals(firstCount - 2, lastCount);
	}
}