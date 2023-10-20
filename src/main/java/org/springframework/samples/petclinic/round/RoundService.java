package org.springframework.samples.petclinic.round;

import java.util.Collection;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.query.Param;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoundService {
    
    private RoundRepository roundRepository;

    @Autowired
    public RoundService(RoundRepository roundRepository){
        this.roundRepository = roundRepository;
    }

    //GET ROUNDS BY MATCH ID
    @Transactional(readOnly = true)
    public Collection<Round> findByMatchId (int matchId) throws DataAccessException{
        return this.roundRepository.findByMatchId(matchId);
    }

    //GET NUMBER OF ROUNDS BY MATCH ID
    @Transactional(readOnly = true)
    public Integer getRoundsByMatchId(@Param("matchId") int matchId)  throws DataAccessException{
        return this.roundRepository.getRoundsByMatchId(matchId);
    }

    //GET NUMBER OF ROUNDS BY PLAYRER ID
    @Transactional(readOnly = true)
    public Integer getRoundsByPlayerId(@Param("playerId") int playerId) throws DataAccessException{
        return this.roundRepository.getRoundsByPlayerId(playerId);
    }
    
    //GET ALL ROUNDS
    @Transactional(readOnly = true)
    public Iterable<Round> findAll() throws DataAccessException {
        return this.roundRepository.findAll();
    }

    //FIND A ROUND BY ID
    @Transactional(readOnly = true)
	public Round findRoundById(int id) throws DataAccessException {
		return this.roundRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Round", "ID", id));
	}

    //SAVE
    @Transactional
	public Round saveRound(Round round) throws DataAccessException {
		roundRepository.save(round);
		return round;
	}

    //UPDATE
	@Transactional
	public Round updateRound(Round round, int id) throws DataAccessException {
		Round toUpdate = findRoundById(id);
		BeanUtils.copyProperties(round, toUpdate, "id");
		return saveRound(toUpdate);
	}
    //DELETE
	@Transactional
	public void deleteRound(int id) throws DataAccessException {
		Round toDelete = findRoundById(id);
		roundRepository.delete(toDelete);

    }
}