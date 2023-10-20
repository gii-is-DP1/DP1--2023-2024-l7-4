package org.springframework.samples.petclinic.round;

import java.util.Collection;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RoundRepository extends CrudRepository<Round, Integer>{
    
    //Entidad ronda de una partida
    @Query("SELECT round FROM Round round WHERE round.match.id = :matchId")
    public Collection<Round> findByMatchId(@Param("matchId") int matchId);

    //Conseguir rondas de un match a partir del id
    @Query("SELECT COUNT(r) FROM Round r WHERE r.match.id = matchId")
    public Integer getRoundsByMatchId(@Param("matchId") int matchId);


    //ACHIEVEMENTS
    @Query("SELECT COUNT(round) FROM Round round WHERE round.player.id = playerId")
    public Integer getRoundsByPlayerId(@Param("playerId") int playerId);


}
