package org.springframework.samples.petclinic.round;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface RoundRepository extends CrudRepository<Round, Integer>{


	@Query("SELECT round FROM Round round WHERE round.subRound = :roundId AND round.match.id = :matchId")
	public Optional<Round> findRoundByMatch(Integer matchId, Integer roundId);

}
