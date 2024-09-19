package org.springframework.samples.petclinic.match;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.gunfighter.Gunfighter;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
public class MatchServiceTests {

	@Mock
	private MatchRepository matchRepository;

	@InjectMocks
	private MatchService matchService;

	private Match match1;
	private Match match2;
	private Gunfighter gunfighter1;
	private Gunfighter gunfighter2;
	private Player player1;
	private Player player2;
	private Authorities authorities;

	@BeforeEach
	void setup() {

		authorities = new Authorities();
		authorities.setAuthority("PLAYER");

		match1 = new Match();
		match1.setId(1);
		match1.setName("partida1");
		match1.setDeck(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
		match1.setJoinedPlayers(List.of("Player1", "Player2"));
		match1.setMatchState(MatchState.OPEN);

		match2 = new Match();
		match2.setId(2);
		match2.setName("partida2");
		match2.setDeck(List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
		match2.setJoinedPlayers(List.of("Player1", "Player2"));
		match2.setMatchState(MatchState.CLOSED);

		player1 = new Player();
		player1.setId(1);
		player1.setUsername("player1.doe");
		player1.setPassword("password");
		player1.setAuthority(authorities);
		player1.setName("player1");
		player1.setSurname("Doe");
		player1.setAvatar("avatar.png");
		player1.setNickname("player1doe");
		player1.setEmail("player1.doe@example.com");

		player2 = new Player();
		player2.setId(2);
		player2.setUsername("player2.doe");
		player2.setPassword("password");
		player2.setAuthority(authorities);
		player2.setName("player2");
		player2.setSurname("Doe");
		player2.setAvatar("avatar.png");
		player2.setNickname("player2doe");
		player2.setEmail("player2.doe@example.com");

		gunfighter1 = new Gunfighter();
		gunfighter1.setId(1);
		gunfighter1.setMatch(match1);
		gunfighter1.setPlayer(player1);

		gunfighter2 = new Gunfighter();
		gunfighter2.setId(2);
		gunfighter2.setMatch(match2);
		gunfighter2.setPlayer(player2);

	}

	@Test
	void shouldFindAllMatches() {
		when(matchRepository.findAll()).thenReturn(List.of(match1, match2));
		List<Match> matches = (List<Match>) this.matchService.findAll();
		assertEquals(2, matches.size());
	}

	@Test
	void shouldNotFindSingleMatchWithBadID() {
		assertThrows(ResourceNotFoundException.class, () -> this.matchService.findMatchById(100));
	}

	@Test
	void shouldFindSingleMatchById() {
		when(matchRepository.findById(1)).thenReturn(Optional.of(match1));
		Match m = this.matchService.findMatchById(1);
		assertEquals("partida1", m.getName());
	}

	@Test
	void shouldFindMatchByPlayer() {
		when(matchRepository.findMatchsByPlayer("Player1")).thenReturn(List.of(match1, match2));
		List<Match> matches = this.matchService.findMatchsByPlayer("Player1");
		assertEquals(2, matches.size());
	}

	@Test
	void shouldFindMatchClosedByPlayer() {
		when(matchRepository.findMatchsClosedByPlayer("Player1")).thenReturn(List.of(match2));
		List<Match> matches = this.matchService.findMatchsClosedByPlayer("Player1");
		assertEquals(1, matches.size());
	}

	@Test
	void shouldFindAllOpenList() {
		when(matchRepository.findAllOpen()).thenReturn(List.of(match1));
		List<Match> matches = this.matchService.findAllOpenList();
		assertEquals(1, matches.size());
	}

	@Test
	@Transactional
	void shouldDeleteMatch() throws DataAccessException {
		when(matchRepository.findById(1)).thenReturn(Optional.of(match1));

		matchService.deleteMatch(1);
	}

	@Test
	@Transactional
	void shouldDeleteMatches() throws DataAccessException {
		when(matchRepository.findById(1)).thenReturn(Optional.of(match1));
		when(matchRepository.findById(2)).thenReturn(Optional.of(match2));
		Match match1 = this.matchService.findMatchById(1);
		Match match2 = this.matchService.findMatchById(2);

		matchService.deleteMatches(List.of(match2, match1));
	}

	@Test
	@Transactional
	void shouldDealInitialCards() {
		matchService.initialDeal(match1, gunfighter1, gunfighter2);

		assertEquals(8, gunfighter2.getCards().size());
		assertEquals(8, gunfighter1.getCards().size());
	}

}
