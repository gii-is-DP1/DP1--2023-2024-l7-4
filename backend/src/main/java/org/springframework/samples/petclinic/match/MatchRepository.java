package org.springframework.samples.petclinic.match;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.samples.petclinic.board.GameBoard;



public interface MatchRepository extends CrudRepository<Match, Integer>{
    
    @Query("SELECT m FROM Match m WHERE :player IN (m.joinedPlayers)")
    public Collection<Match> findMatchsByPlayer(String player);

    @Query("SELECT m FROM Match m WHERE m.id = id")
    public Optional<Match> existsMatch(Integer id);

    @Query("SELECT m FROM Match m WHERE m.matchState IN (CLOSED) AND :player IN (m.joinedPlayers)")
    public Collection<Match> findMatchsClosedByPlayer(String player);

    @Query("SELECT m FROM Match m WHERE m.matchState IN (OPEN)")
    public Collection<Match> findAllOpen();

    //FALTA ID DE PARTIDA
    @Query("SELECT b FROM GameBoard b WHERE b.player.id = :playerId")
    public Optional<GameBoard> findBoardByPlayer(Integer playerId);

}