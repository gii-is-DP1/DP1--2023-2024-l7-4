package org.springframework.samples.petclinic.player;

import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface PlayerRepository extends CrudRepository<Player, Integer>{
    
@Query("SELECT p FROM Player p ORDER BY p.total_score DESC")
public Collection<Player> sortedPlayersByPuntuation();

@Query("SELECT p FROM Player p WHERE p.username = :username")
public Player existsPlayer(String username);

}

