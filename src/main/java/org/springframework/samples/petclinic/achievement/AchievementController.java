package org.springframework.samples.petclinic.achievement;

import java.net.URISyntaxException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.configuration.services.NotificationService;
import org.springframework.samples.petclinic.gunfighter.GunfighterService;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.match.MatchState;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/achievement")
@SecurityRequirement(name = "bearerAuth")
public class AchievementController {

    private MatchService matchService;
    private AchievementService achievementService;

    @Autowired
    public AchievementController(MatchService matchService,AchievementService achievementService) {
        this.matchService = matchService;
        this.achievementService= achievementService;

    }
    @GetMapping("/{id}")
    public ResponseEntity<Achievement> findById(@PathVariable(name = "id") int id) {
        return new ResponseEntity<>(achievementService.findAchievementById(id), HttpStatus.OK);
    }
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Achievement> create(@RequestBody @Valid Achievement achievement) throws URISyntaxException {
        Achievement newAchievement = new Achievement();
        BeanUtils.copyProperties(achievement, newAchievement, "id");
        Achievement savedAchievement= this.achievementService.saveAchievement(newAchievement);

        return new ResponseEntity<>(savedAchievement, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable(name = "id") int id) {
        achievementService.deleteAchievement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
//LOGROS

@GetMapping("/juegaXpartidas/{id}")
public Boolean juega5partidas(@PathVariable("id") Integer id){
    return achievementService.juegaXpartidas(id);
}

@GetMapping("/ganaXpartidas/{id}")
public Boolean gana5partidas(@PathVariable("id") Integer id) {
 return achievementService.ganaXpartidas(id);
}
}
