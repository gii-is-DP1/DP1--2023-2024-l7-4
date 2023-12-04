package round;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface RoundRepository extends CrudRepository<Round, Integer>{
    
	@Query("SELECT DISTINCT round FROM Round round WHERE round.user.id = :userId")
	public Optional<Round> findByUser(int userId);



	// STATS

	@Query("SELECT COUNT(r) FROM Round r WHERE r.user.id = :userId")
	public Integer countRoundsById(int userId);

	@Query("SELECT COUNT(r) FROM Round r")
	public Integer countAll();

}
