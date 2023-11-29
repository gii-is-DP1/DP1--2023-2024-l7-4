package org.springframework.samples.petclinic.board;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface GameBoardRepository extends CrudRepository<GameBoard, Integer>{
    
    @Query("SELECT gb FROM GameBoard gb WHERE gb.player.id = :playerId AND gb.match.id = :matchId")
    public Optional<GameBoard> findBoardByPlayerAndMatch(Integer playerId, Integer matchId);

}
