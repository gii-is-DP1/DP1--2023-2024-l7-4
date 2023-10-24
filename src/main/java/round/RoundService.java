package round;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerRepository;
import org.springframework.transaction.annotation.Transactional;

public class RoundService {
    
    private RoundRepository roundRepository;

    @Autowired
    public RoundService(RoundRepository roundRepository){
        this.roundRepository = roundRepository;
    }

    @Transactional(readOnly = true)
	public Collection<Round> findAll() {
		return (List<Round>) roundRepository.findAll();
	}



    @Transactional(readOnly = true)
	public Round findRoundById(int id) throws DataAccessException {
		return this.roundRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Round", "ID", id));
	}
    @Transactional
	public Round saveRound(Round round) throws DataAccessException {
		roundRepository.save(round);
		return round;
	}

    @Transactional
    public Round updateRound(Round round, int id) throws DataAccessException {
        Round toUpdate = findRoundById(id);
        BeanUtils.copyProperties(round, toUpdate, "id");
        return saveRound(toUpdate);
    }

    @Transactional
    public void deleteRound( int id) throws DataAccessException {
        Round toDelete = findRoundById(id);
        roundRepository.delete(toDelete);
    }
}
