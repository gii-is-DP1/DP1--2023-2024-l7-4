package org.springframework.samples.petclinic.achievement;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchRepository;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserRepository;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
class AchievementServiceTests {

    @Mock
    private AchievementRepository achievementRepository;

    @Mock
    private MatchRepository matchRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private MatchService matchService;

    @InjectMocks
    private AchievementService achievementService;

    private Achievement achievement1;
    private Achievement achievement2;
    private Player player;
    private Match match1;
    private Match match2;
    private User user;

    @BeforeEach
    void setup() {
        achievement1 = new Achievement();
        achievement1.setId(1);
        achievement1.setName("First Victory");
        achievement1.setMetric(1);
        achievement1.setThreshold(Threshold.VICTORIES);

        achievement2 = new Achievement();
        achievement2.setId(2);
        achievement2.setName("Total Playtime");
        achievement2.setMetric(60); // 60 minutes of playtime
        achievement2.setThreshold(Threshold.TOTALPLAYTIME);

        player = new Player();
        player.setId(1);
        player.setUsername("player1");

        match1 = new Match();
        match1.setId(1);
        match1.setWinner("player1");
        match1.setStartDate(LocalDateTime.now().minusMinutes(30));
        match1.setFinishDateTime(LocalDateTime.now());

        match2 = new Match();
        match2.setId(2);
        match2.setWinner("player1");
        match2.setStartDate(LocalDateTime.now().minusMinutes(40));
        match2.setFinishDateTime(LocalDateTime.now());

        user = new User();
        user.setId(1);
        user.setUsername("player1");
    }

    @Test
    void shouldFindAllAchievements() {
        when(achievementRepository.findAll()).thenReturn(List.of(achievement1, achievement2));

        Iterable<Achievement> achievements = achievementService.findAll();
        assertEquals(2, ((List<Achievement>) achievements).size());
    }

    @Test
    void shouldFindAchievementById() {
        when(achievementRepository.findById(1)).thenReturn(Optional.of(achievement1));

        Achievement found = achievementService.findAchievementById(1);
        assertEquals("First Victory", found.getName());
    }

    @Test
    void shouldThrowExceptionWhenFindingNonExistingAchievementById() {
        when(achievementRepository.findById(100)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> achievementService.findAchievementById(100));
    }

    @Test
    void shouldSaveAchievement() {
        when(achievementRepository.save(achievement1)).thenReturn(achievement1);

        Achievement saved = achievementService.saveAchievement(achievement1);
        assertEquals("First Victory", saved.getName());
    }

    @Test
    void shouldUpdateAchievement() {
        when(achievementRepository.findById(1)).thenReturn(Optional.of(achievement1));
        when(achievementRepository.save(achievement1)).thenReturn(achievement1);

        Achievement updated = achievementService.updateAchievement(achievement1, 1);
        assertEquals("First Victory", updated.getName());
    }

    @Test
    void shouldDeleteAchievement() {
        when(achievementRepository.findById(1)).thenReturn(Optional.of(achievement1));

        achievementService.deleteAchievement(1);
        verify(achievementRepository, times(1)).delete(achievement1);
    }

    @Test
    void shouldReturnTrueWhenUserMeetsVictoryAchievementCriteria() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(matchService.findMatchsByPlayer("player1")).thenReturn(List.of(match1, match2));
        when(achievementRepository.findById(1)).thenReturn(Optional.of(achievement1)); 

        Boolean result = achievementService.Success(1, 1);
        assertTrue(result);
    }

    @Test
    void shouldReturnTrueWhenUserMeetsPlaytimeAchievementCriteria() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(matchService.findMatchsByPlayer("player1")).thenReturn(List.of(match1, match2));
        when(achievementRepository.findById(2)).thenReturn(Optional.of(achievement2));

        Boolean result = achievementService.Success(1, 2);
        assertTrue(result);
    }

    @Test
    void shouldReturnFalseWhenUserDoesNotMeetPlaytimeAchievementCriteria() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(matchService.findMatchsByPlayer("player1")).thenReturn(List.of(match1));
        when(achievementRepository.findById(2)).thenReturn(Optional.of(achievement2)); 

        Boolean result = achievementService.Success(1, 2);
        assertFalse(result);
    }
}
