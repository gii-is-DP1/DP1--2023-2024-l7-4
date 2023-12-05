package org.springframework.samples.petclinic.score;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ScoreMatchService {
    

    private ScoreMatchRepository smRepo;

    @Autowired
    public ScoreMatchService(ScoreMatchRepository sm){
        smRepo=sm;
    }


    @Transactional(readOnly = true)
    public Integer getTotalScoreByPlayerUsername(String username){
        List<ScoreMatch> smByPlayer = (List<ScoreMatch>) this.smRepo.findAllScoresByPlayer(username);
        return smByPlayer.stream().map(sm -> sm.getTotalScore()).reduce((acumulator, score) -> {return acumulator + score;}).orElse(0);
    }
    
}
