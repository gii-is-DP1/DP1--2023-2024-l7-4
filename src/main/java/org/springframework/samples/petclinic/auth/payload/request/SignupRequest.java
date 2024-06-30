package org.springframework.samples.petclinic.auth.payload.request;

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

	
	

}