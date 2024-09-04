package org.springframework.samples.petclinic.request;

import org.springframework.data.repository.CrudRepository;
import org.springframework.samples.petclinic.player.Player;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface RequestRepository extends CrudRepository<Request, Integer>{
    
    @Query("SELECT p FROM Player p WHERE p.username = :username")
    public Optional<Player> existsPlayer(String username);

    @Query("SELECT r FROM Request r WHERE r.playerTwo = :username AND r.status = 'pending'")
    public List<Request> findReceivedRequest(String username);

    
}