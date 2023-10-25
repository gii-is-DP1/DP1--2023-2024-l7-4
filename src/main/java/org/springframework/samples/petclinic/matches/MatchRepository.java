package org.springframework.samples.petclinic.match;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.samples.petclinic.player.Player;

public interface MatchRepository extends CrudRepository<Match,Integer>{

    @Query("SELECT m from Match m where m.joinedPlayers contains :player")
    public Collection<Match> findMatchsByPlayer(Player player);

    @Query("SELECT m from Match m where match.id = id")
    public Optional<Match> existsMatch(Integer id);


}