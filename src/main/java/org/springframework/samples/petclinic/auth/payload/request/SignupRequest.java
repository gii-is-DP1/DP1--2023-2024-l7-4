package org.springframework.samples.petclinic.auth.payload.request;

import java.time.LocalDate;

import org.springframework.samples.petclinic.player.ProfileType;

import jakarta.validation.constraints.NotBlank;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
	
	// User
	@NotBlank
	private String name;
	
	@NotBlank
	private String surname;

	@NotBlank
	private String email;
	
	@NotBlank
	private String avatar;

	@NotBlank
	private String nickname;

	@NotBlank
	private String username;

	@NotBlank
	private String password;

	@NotBlank
	private String location;

	private ProfileType profileType;

	private String biography;

	private LocalDate birthdate;

	private String favoriteGenres;

	private String favoritePlatforms;

	private String favoriteSagas;


}