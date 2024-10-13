package org.springframework.samples.petclinic.auth;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.auth.payload.request.SignupRequest;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.samples.petclinic.user.AuthoritiesService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final PasswordEncoder encoder;
	private final AuthoritiesService authoritiesService;
	private final PlayerService playerService;

	@Autowired
	public AuthService(PasswordEncoder encoder, AuthoritiesService authoritiesService, PlayerService playerService) {
		this.encoder = encoder;
		this.authoritiesService = authoritiesService;
		this.playerService = playerService;
	}	

	@Transactional
	public void createPlayer(@Valid SignupRequest request) {
		Player player = new Player();
		Authorities role = authoritiesService.findByAuthority("PLAYER");
		player.setName(request.getName());
		player.setSurname(request.getSurname());
		player.setAvatar(request.getAvatar());
		player.setNickname(request.getNickname());
		player.setEmail(request.getEmail());
		player.setUsername(request.getUsername());
		player.setLocation(request.getLocation());
		player.setBiography(request.getBiography());
		player.setBirthdate(request.getBirthdate());
		player.setFavoriteGenres(request.getFavoriteGenres());
		player.setFavoritePlatforms(request.getFavoritePlatforms());
		player.setFavoriteSagas(request.getFavoriteSagas());
		player.setProfileType(request.getProfileType());
		player.setPassword(encoder.encode(request.getPassword()));
		player.setAuthority(role);
		playerService.savePlayer(player);

		
	}
}