package org.springframework.samples.petclinic.match;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.board.GameBoard;

import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MatchService {
    
    private MatchRepository matchRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository){
        this.matchRepository = matchRepository;

    }


    @Transactional(readOnly = true)
    public Iterable<Match> findAll() throws DataAccessException {
		return this.matchRepository.findAll();
	}

    @Transactional(readOnly = true)
    public Match findMatchById(Integer id) throws DataAccessException{
        return this.matchRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match", "ID", id));
    }


    @Transactional
    public Match saveMatch(Match match) throws DataAccessException {
        matchRepository.save(match);
        return match;
    }

    @Transactional(readOnly = true)
    public List<Match> findMatchsByPlayer(String username) throws DataAccessException {
        return (List<Match>) matchRepository.findMatchsByPlayer(username);
    }


    @Transactional(readOnly = true)
    public List<Match> findMatchsClosedByPlayer(String p) throws DataAccessException {
        return (List<Match>) matchRepository.findMatchsClosedByPlayer(p);
    }  

    @Transactional(readOnly = true)
    public List<Match> findAllOpenList() throws DataAccessException {
        return (List<Match>) matchRepository.findAllOpen();
    }


    @Transactional(readOnly = true)
    public GameBoard findGameBoardByPlayerId(Integer id) throws DataAccessException {
          return this.matchRepository.findBoardByPlayer(id).orElseThrow(() -> new ResourceNotFoundException("Match", "ID", id));
    }

    @Transactional
	public void deleteMatch(int id) throws DataAccessException {
		Match toDelete = findMatchById(id);
		matchRepository.delete(toDelete);
	}


}
