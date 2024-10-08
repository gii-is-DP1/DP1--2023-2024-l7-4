package org.springframework.samples.petclinic.achievement;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AchievementService {
    private AchievementRepository achievementRepository;
    private UserRepository userRepository;
    private MatchService matchService;


    @Autowired
    public AchievementService(AchievementRepository achievementRepository, UserRepository userRepository,MatchService matchService) {
        this.achievementRepository = achievementRepository;
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
    if (threshold == Threshold.TOTALPLAYTIME){
         List<Double> timePlayedForMatchesByPlayer= new ArrayList<>();
         Double timePlayed= null;
         for (Match m : matches) {
            if (m.getStartDate() != null && m.getFinishDateTime() != null) {
                Double tiempo = ChronoUnit.MINUTES.between(m.getStartDate(), m.getFinishDateTime()) + 0.;
                timePlayedForMatchesByPlayer.add(tiempo);
                timePlayed= timePlayedForMatchesByPlayer.stream().mapToDouble(Double::doubleValue).sum();
                    if (metric<=timePlayed){
                        res= true;
                    }
            }
         }

    }
    return res;
    }
}