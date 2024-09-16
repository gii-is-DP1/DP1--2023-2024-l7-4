package org.springframework.samples.petclinic.player;

import java.time.LocalDate;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerDetailDTO {

    private String nickname;
    private String avatar;
    private String biography;
    private String location;
    private LocalDate birthdate;
    private String favoriteGenres;
    private String favoritePlatforms;
    private String favoriteSagas;
}
