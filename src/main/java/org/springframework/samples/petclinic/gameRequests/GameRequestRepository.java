package org.springframework.samples.petclinic.gameRequests;

import org.springframework.data.repository.CrudRepository;
import org.springframework.samples.petclinic.player.Player;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

public interface GameRequestRepository extends CrudRepository<GameRequest, Integer> {

    @Query("SELECT p FROM Player p WHERE p.username = :username")
    public Optional<Player> existsPlayer(String username);

    @Query("SELECT g FROM GameRequest g WHERE g.playerTwo.id = :id AND g.status = 'PENDING'")
    public List<GameRequest> findReceivedGameRequest(Integer id);

}