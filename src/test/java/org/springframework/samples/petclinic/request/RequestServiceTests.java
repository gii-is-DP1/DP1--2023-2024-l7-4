
package org.springframework.samples.petclinic.request;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.List;


import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerRepository;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
// @DataJpaTest(includeFilters =
// {@ComponentScan.Filter(Service.class),@ComponentScan.Filter(PasswordEncoder.class)})
@SpringBootTest
@AutoConfigureTestDatabase
public class RequestServiceTests {
    
	@InjectMocks
    private RequestService requestService;

	@Mock
	private RequestRepository requestRepository;

	@Mock
    private PlayerRepository playerRepository;

	@Autowired
	public RequestServiceTests(RequestService requestService, RequestRepository requestRepository) {
		this.requestService = requestService;
		this.requestRepository = requestRepository;
	}


	private Request request1;

	@BeforeEach
    void setup() {
        request1 = new Request();

        Player player1 = new Player();
        player1.setId(4);
        player1.setUsername("PlayerOne");

        Player player2 = new Player();
        player2.setId(5);
        player2.setUsername("PlayerTwo");

        request1.setId(100);
        request1.setPlayerOne(player1);
        request1.setPlayerTwo(player2);
        request1.setStatus(RequestState.PENDING);
    }

	@Test
	void shouldFindAllRequests() {
		List<Request> requests = (List<Request>) this.requestService.findAll();
		assertEquals(5, requests.size());
	}

	@Test
	void shouldThrowResourceNotFoundExceptionWhenRequestNotFound() {
    
    when(requestRepository.findById(100)).thenReturn(Optional.empty());
    assertThrows(ResourceNotFoundException.class, () -> requestService.findRequestById(100));
}

	@Test
	void shouldFindSingleRequestById() {
		Request m = this.requestService.findRequestById(1);
		assertEquals(1, m.getId());
	}

	@Test
	void shouldNotFindRecievedRequest() {
		List<Request> requests = this.requestService.findRecievedRequest(1);
		assertEquals(0, requests.size());
	}

	@Test
	void shouldSaveRequest() {

    Request requestToSave = request1;

    when(requestRepository.save(any(Request.class))).thenReturn(requestToSave);

    Request savedRequest = requestService.saveRequest(requestToSave);

    assertEquals(requestToSave.getId(), savedRequest.getId());
    assertEquals(requestToSave.getPlayerOne().getId(), savedRequest.getPlayerOne().getId());
    assertEquals(requestToSave.getPlayerTwo().getId(), savedRequest.getPlayerTwo().getId());
    assertEquals(requestToSave.getStatus(), savedRequest.getStatus());

    }

	@Test
	void shouldAcceptRequest() throws DataAccessException {
    
    Request requestToAccept = new Request();
    requestToAccept.setId(1);
    requestToAccept.setStatus(RequestState.PENDING);

    when(requestRepository.findById(1)).thenReturn(Optional.of(requestToAccept));

    when(requestRepository.save(any(Request.class))).thenReturn(requestToAccept);

    Request acceptedRequest = requestService.acceptRequest(requestToAccept, 1);

    assertEquals(RequestState.ACCEPTED, acceptedRequest.getStatus());

}

	@Test
	@Transactional
	void shouldDeleteRequest() throws DataAccessException {

		Integer firstCount = ((Collection<Request>) requestService.findAll()).size();

		requestService.rejectRequest(this.requestService.findRequestById(1));

		Integer lastCount = ((Collection<Request>) requestService.findAll()).size();
		assertEquals(firstCount - 1, lastCount);
	}


	@Test
	void shouldGetFriend() throws DataAccessException {

		Player player1 = new Player();
		player1.setId(4);
		
		Player player2 = new Player();
		player2.setId(5);

		Player player3 = new Player();
    	player3.setId(6);

	Request acceptedRequest1 = new Request();
    acceptedRequest1.setPlayerOne(player1);
    acceptedRequest1.setPlayerTwo(player2);
    acceptedRequest1.setStatus(RequestState.ACCEPTED);

    Request pendingRequest = new Request();
    pendingRequest.setPlayerOne(player1);
	pendingRequest.setPlayerTwo(player3);
    pendingRequest.setStatus(RequestState.PENDING);

    Request acceptedRequest2 = new Request();
    acceptedRequest2.setPlayerTwo(player1);
	acceptedRequest2.setPlayerOne(player3);
    acceptedRequest2.setStatus(RequestState.ACCEPTED);

	when(requestRepository.findAll()).thenReturn(List.of(acceptedRequest1, pendingRequest, acceptedRequest2));

	Set<Player> amigos = this.requestService.getFriends(4);

	assertEquals(2, amigos.size());

	}


}