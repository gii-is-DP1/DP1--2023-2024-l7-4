package org.springframework.samples.petclinic.achievement;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/achievements")
@SecurityRequirement(name = "bearerAuth")
public class AchievementController {

    private AchievementService achievementService;

    @Autowired
    public AchievementController(AchievementService achievementService) {
        this.achievementService= achievementService;

    }
    @GetMapping
    public ResponseEntity<List<Achievement>> findAll(@RequestParam(required = false, name = "open") boolean sorted) {
        return new ResponseEntity<>((List<Achievement>) achievementService.findAll(), HttpStatus.OK);
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

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Achievement> updateAchievement(@PathVariable("id") Integer id,@RequestBody @Valid Achievement achievement) throws NotFoundException{
        return new ResponseEntity<>(this.achievementService.updateAchievement(achievement,id), HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable(name = "id") int id) {
        achievementService.deleteAchievement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
//LOGROS

@GetMapping("{id}/{achievementId}")
public Boolean Success(@PathVariable("id") Integer id,@PathVariable("achievementId") Integer achievementId){
    return achievementService.Success(id,achievementId);
}

}
