package org.springframework.samples.petclinic.round;

import java.util.Collection;
import java.util.List;

import javax.swing.tree.ExpandVetoException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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

    @Transactional(readOnly = true)
	public Collection<Round> findAll() {
		return (List<Round>) roundRepository.findAll();
	}

    @Transactional(readOnly = true)
	public Round findRoundById(int id) throws DataAccessException {
		return this.roundRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Round", "ID", id));
	}
    
    @Transactional(readOnly = true)
	public Round findRoundByMatchRound(Integer matchId, Integer subRound) throws DataAccessException {
		return this.roundRepository.findRoundByMatch(matchId, subRound).orElseThrow(() -> new ResourceNotFoundException("Couldnt find that round in that match"));
	}
    
    @Transactional
	public Round saveRound(Round round) throws DataAccessException {
        try {
        if(this.roundRepository.findRoundByMatch(round.getMatch().getId(), round.getSubRound()).isPresent()){
            throw new ResourceNotFoundException("Already exists this subround in this match");
        }
		roundRepository.save(round);
		return round;
	} catch(Error e){
        throw new Error(e);
    }
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
