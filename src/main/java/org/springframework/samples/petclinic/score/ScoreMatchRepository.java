package org.springframework.samples.petclinic.score;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ScoreMatchRepository extends CrudRepository<ScoreMatch, Integer>{
    
    @Query("SELECT sm FROM ScoreMatch sm WHERE sm.player.username = :playerName")
    public Collection<ScoreMatch> findAllScoresByPlayer(String playerName);

}
