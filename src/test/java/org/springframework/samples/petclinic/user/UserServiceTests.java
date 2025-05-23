package org.springframework.samples.petclinic.user;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Collection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

//@DataJpaTest(includeFilters = @ComponentScan.Filter(Service.class))
@SpringBootTest
@AutoConfigureTestDatabase
class UserServiceTests {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthoritiesService authService;

	@Test
	@WithMockUser(username = "player1", password = "0wn3r")
	void shouldFindCurrentUser() {
		User user = this.userService.findCurrentUser();
		assertEquals("player1", user.getUsername());
	}

	@Test
	@WithMockUser(username = "prueba")
	void shouldNotFindCorrectCurrentUser() {
		assertThrows(ResourceNotFoundException.class, () -> this.userService.findCurrentUser());
	}

	@Test
	void shouldNotFindAuthenticated() {
		assertThrows(ResourceNotFoundException.class, () -> this.userService.findCurrentUser());
	}

	@Test
	void shouldNotFindUserByIncorrectUsername() {
		assertThrows(ResourceNotFoundException.class, () -> this.userService.findUser("usernotexists"));
	}

	@Test
	void shouldNotFindSingleUserWithBadID() {
		assertThrows(ResourceNotFoundException.class, () -> this.userService.findUser(100));
	}

	@Test
	void shouldNotExistUser() {
		assertEquals(false, this.userService.existsUser("owner10000"));
	}

	@Test
	@Transactional
	void shouldInsertUser() {
		int count = ((Collection<User>) this.userService.findAll()).size();

		User user = new User();
		user.setUsername("Sam");
		user.setPassword("password");
		user.setAuthority(authService.findByAuthority("ADMIN"));

		this.userService.saveUser(user);
		assertNotEquals(0, user.getId().longValue());
		assertNotNull(user.getId());

		int finalCount = ((Collection<User>) this.userService.findAll()).size();
		assertEquals(count + 1, finalCount);
	}

	// @Test
	// @Transactional
	// void shouldDeleteUserWithOwner() {
	// Integer firstCount = ((Collection<User>) userService.findAll()).size();
	// User user = new User();
	// user.setUsername("Sam");
	// user.setPassword("password");
	// Authorities auth = authService.findByAuthority("OWNER");
	// user.setAuthority(auth);
	// Owner owner = new Owner();
	// owner.setAddress("Test");
	// owner.setFirstName("Test");
	// owner.setLastName("Test");
	// owner.setPlan(PricingPlan.BASIC);
	// owner.setTelephone("999999999");
	// owner.setUser(user);
	// owner.setCity("Test");
	// this.ownerService.saveOwner(owner);
	//
	// Integer secondCount = ((Collection<User>) userService.findAll()).size();
	// assertEquals(firstCount + 1, secondCount);
	// userService.deleteUser(user.getId());
	// Integer lastCount = ((Collection<User>) userService.findAll()).size();
	// assertEquals(firstCount, lastCount);
	// }
	// @Test
	// @Transactional
	// void shouldDeleteUserWithVet() {
	// Integer firstCount = ((Collection<User>) userService.findAll()).size();
	// User user = new User();
	// user.setUsername("Sam");
	// user.setPassword("password");
	// Authorities auth = authService.findByAuthority("VET");
	// user.setAuthority(auth);
	// userService.saveUser(user);
	// Vet vet = new Vet();
	// vet.setFirstName("Test");
	// vet.setLastName("Test");
	// vet.setUser(user);
	// vet.setCity("Test");
	// this.vetService.saveVet(vet);
	//
	// Integer secondCount = ((Collection<User>) userService.findAll()).size();
	// assertEquals(firstCount + 1, secondCount);
	// userService.deleteUser(user.getId());
	// Integer lastCount = ((Collection<User>) userService.findAll()).size();
	// assertEquals(firstCount, lastCount);
	// }

}
