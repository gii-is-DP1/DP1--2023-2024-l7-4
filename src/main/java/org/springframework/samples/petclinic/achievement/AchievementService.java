package org.springframework.samples.petclinic.achievement;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchRepository;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class AchievementService {
    private AchievementRepository achievementRepository;
    private MatchRepository matchRepository;
    private UserRepository userRepository;
    private MatchService matchService;


    @Autowired
    public AchievementService(AchievementRepository achievementRepository, MatchRepository matchRepository, UserRepository userRepository,MatchService matchService) {
        this.achievementRepository = achievementRepository;
        this.matchRepository = matchRepository;
        this.userRepository = userRepository;
        this.matchService= matchService;

    }
    @Transactional(readOnly = true)
    public Iterable<Achievement> findAll() throws DataAccessException {
        return this.achievementRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Achievement findAchievementById(Integer id) throws DataAccessException {
        return this.achievementRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match", "ID", id));
    }
    @Transactional
    public Achievement saveAchievement(Achievement achievement) throws DataAccessException {
        achievementRepository.save(achievement);
        return achievement;
    }
        @Transactional
    public Achievement updateAchievement(Achievement achievement, int id) throws DataAccessException {
        Achievement toUpdate = findAchievementById(id);
        BeanUtils.copyProperties(achievement, toUpdate, "id");
        return saveAchievement(toUpdate);
    }
    @Transactional
    public void deleteAchievement(int id) throws DataAccessException {
        Achievement toDelete = findAchievementById(id);
        achievementRepository.delete(toDelete);
    }

    //FUNCIONES PARA LOS LOGROS:
@Transactional(readOnly = true)
public Boolean Success(Integer u, Integer achievementId) throws DataAccessException {
    String userName= userRepository.findById(u).get().getUsername();
    List<Match> matches = matchService.findMatchsByPlayer(userName);
    Integer metric = achievementRepository.findById(achievementId).get().getMetric();
    Threshold threshold = achievementRepository.findById(achievementId).get().getThreshold();
    Boolean res= false;


    if (threshold == Threshold.GAMESPLAYED){
        if(matches.size()>=metric){
            res= true;
        }
    }
    if(threshold == Threshold.VICTORIES){
        Integer numVic = 0 ;
        for(Match m:matches){
            if(m.getWinner() == userName){
                numVic++;
            }
        }
        if(numVic>=metric){
            res= true;
        }
    }
    return res;
}

}
