package org.springframework.samples.petclinic.player;

import java.util.Set;

import org.springframework.samples.petclinic.user.User;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.samples.petclinic.request.Request;

import java.util.Set;
import java.util.HashSet;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder.Default;

@Getter
@Setter
@Entity
@Table(name = "players")
public class Player extends User {

    @Column(name = "name")
    @NotEmpty
    @Size(max = 50)
    String name;

    @Column(name = "surname")
    @NotEmpty
    @Size(max = 80)
    String surname;

    @Column(name = "avatar")
    @NotEmpty
    String avatar;

    @Column(name = "nickname")
    @NotEmpty
    @Size(max = 30)

    String nickname;

    @Column(name = "email", unique = true)
    @NotEmpty
    @Email
    String email;

    @Column(name = "online")
    Boolean online = false;

}
