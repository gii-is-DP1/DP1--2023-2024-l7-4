package org.springframework.samples.petclinic.achievement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.match.MatchRepository;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.samples.petclinic.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AchievementService {
    private AchievementRepository achievementRepository;
    private MatchRepository matchRepository;
    private UserRepository userRepository;
    private MatchService matchService;


    @Autowired
    public AchievementService(AchievementRepository achievementRepository, MatchRepository matchRepository, UserRepository userRepository) {
        this.achievementRepository = achievementRepository;
        this.matchRepository = matchRepository;
        this.userRepository = userRepository;

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
    public void deleteAchievement(int id) throws DataAccessException {
        Achievement toDelete = findAchievementById(id);
        achievementRepository.delete(toDelete);
    }

    //FUNCIONES PARA LOS LOGROS:
@Transactional(readOnly = true)
public Boolean juegaXpartidas(Integer u) throws DataAccessException {
    String userName= userRepository.findById(u).get().getUsername();
    List<Match> matches = matchService.findMatchsByPlayer(userName);
    if(matches.size()<5){
        return false;
    }
    return true;
}

@Transactional(readOnly = true)
    public Boolean ganaXpartidas(Integer u) throws DataAccessException {
        String userName= userRepository.findById(u).get().getUsername();
        List<Match> matches= matchService.findMatchsByPlayer(userName);
        if(matches.size()<5){
            return false;
        }
        Integer numVic = 0 ;
        for(Match m:matches){
            if(m.getWinner() == userName){
                numVic++;
            }
        }
        if(numVic<5){
            return false;
        }
        return true;
    }
}
