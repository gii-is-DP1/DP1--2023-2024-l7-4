package org.springframework.samples.petclinic.player;

import org.springframework.samples.petclinic.user.Authorities;
import org.springframework.samples.petclinic.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "players")
public class Player extends User {
  
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
