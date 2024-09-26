package org.springframework.samples.petclinic.request;

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
public class RequestServiceTests {
    
    private RequestService requestService;

	@Autowired
	public RequestServiceTests(RequestService requestService) {
		this.requestService = requestService;
	}

	@Test
	void shouldFindAllRequests() {
		List<Request> requests = (List<Request>) this.requestService.findAll();
		assertEquals(5, requests.size());
	}

	@Test
	void shouldNotFindSingleRequestWithBadID() {
		assertThrows(ResourceNotFoundException.class, () -> this.requestService.findRequestById(1000));
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
	@Transactional
	void shouldDeleteRequest() throws DataAccessException {

		Integer firstCount = ((Collection<Request>) requestService.findAll()).size();

		requestService.rejectRequest(this.requestService.findRequestById(1));

		Integer lastCount = ((Collection<Request>) requestService.findAll()).size();
		assertEquals(firstCount - 1, lastCount);
	}


}
