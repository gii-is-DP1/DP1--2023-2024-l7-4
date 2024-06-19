package org.springframework.samples.petclinic.player;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Player extends User{
  
    @Column(name = "name")
    @NotEmpty
    String name;

    @Column(name = "surname")
    @NotEmpty   
    String surname;

    @Column(name = "avatar")
    @NotEmpty
    String avatar;

    @Column(name = "nickname")
    @NotEmpty
    String nickname;

    @Column(name = "email", unique = true)
    @NotEmpty
    String email;
}
