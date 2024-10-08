package org.springframework.samples.petclinic.player;

import org.springframework.samples.petclinic.user.User;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

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

    @Column(name = "biography")
    @Size(max=300)
    String biography;

    @Column(name = "location")
    @NotEmpty  
    @Size(max=50) 
    String location;

    @Column(name = "birthdate")
    @Past
    LocalDate birthdate;

    @Column(name = "favorite_genres")
    @Size(max=50)
    String favoriteGenres;

    @Column(name = "favorite_platforms")
    @Size(max=50)
    String favoritePlatforms;

    @Column(name = "favorite_sagas")
    @Size(max=50)
    String favoriteSagas;

    @Column(name = "profile_type")
    @Enumerated(EnumType.STRING)
    ProfileType profileType;

    @Column(name = "games_played_today")
    Integer gamesPlayedToday = 0;

    @Column(name = "last_game_date")
    LocalDate lastGameDate;
    
    Boolean online = false;

}
