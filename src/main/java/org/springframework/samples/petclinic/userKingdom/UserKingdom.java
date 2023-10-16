package org.springframework.samples.petclinic.userKingdom;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.user.Authorities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class UserKingdom extends BaseEntity {

	@Column(name = "name")
	@NotEmpty
	protected String name;

	@Column(name = "surname")
	@NotEmpty
	protected String surname;

    @Column(name = "avatar")
	@NotEmpty
	protected String lastavatarName;

    @Column(name = "nickname")
	@NotEmpty
	protected String nickname;

    @Column(name = "email")
	@NotEmpty
	protected String email;

	@Column(unique = true)
	String username;

	String password;

	@NotNull
	@ManyToOne(optional = false)
	@JoinColumn(name = "authority")
	Authorities authority;


	public Boolean hasAuthority(String auth) {
		return authority.getAuthority().equals(auth);
	}

	public Boolean hasAnyAuthority(String... authorities) {
		Boolean cond = false;
		for (String auth : authorities) {
			if (auth.equals(authority.getAuthority()))
				cond = true;
		}
		return cond;
	}

}
