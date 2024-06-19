package org.springframework.samples.petclinic.player;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Integer>{

    List<Player> findAll();

    @Query("SELECT DISTINCT player FROM Player player WHERE player.user.id = :userId")
	public Player findByUserId(int userId);

    @Query("SELECT player FROM Player player WHERE player.user.username = :username")
    public Player findByUsername(String username);

    @Query("SELECT p FROM Player p ORDER BY p.total_score DESC")
    public Collection<Player> sortedPlayersByPuntuation();

    @Query("SELECT p FROM Player p WHERE p.username = :username")
    public Optional<Player> existsPlayer(String username);
}