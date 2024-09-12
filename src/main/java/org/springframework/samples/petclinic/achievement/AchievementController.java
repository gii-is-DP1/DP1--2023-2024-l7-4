package org.springframework.samples.petclinic.achievement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.configuration.services.NotificationService;
import org.springframework.samples.petclinic.gunfighter.GunfighterService;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

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
}
