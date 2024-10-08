package org.springframework.samples.petclinic.gunfighter;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GunfighterRepository extends CrudRepository<Gunfighter, Integer>{
    
    @Query("SELECT g FROM Gunfighter g WHERE g.playerNumber = :playerNumber AND g.match.id = :matchId")
    public Optional<Gunfighter> findGunfighter(Integer playerNumber, Integer matchId);

}
