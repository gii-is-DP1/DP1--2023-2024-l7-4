package org.springframework.samples.petclinic.request;

import org.springframework.data.repository.CrudRepository;
import org.springframework.samples.petclinic.player.Player;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;



public interface RequestRepository extends CrudRepository<Request, Integer>{
    
    @Query("SELECT p FROM Player p WHERE p.username = :username")
    public Optional<Player> existsPlayer(String username);

    @Query("SELECT r FROM Request r WHERE r.playerTwo.id = :id AND r.status = 'PENDING'")
    public List<Request> findReceivedRequest(Integer id);

  
}