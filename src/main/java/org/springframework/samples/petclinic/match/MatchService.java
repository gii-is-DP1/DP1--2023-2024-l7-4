package org.springframework.samples.petclinic.match;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.board.GameBoard;
import org.springframework.samples.petclinic.owner.Owner;
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
    public Collection<Match> findAll() {
		return (List<Match>) this.matchRepository.findAll();
	}

    @Transactional(readOnly = true)
    public Match findMatchById(Integer id){
        Optional<Match> m = matchRepository.findById(id);
        return m.get()==null?null:m.get();
    }


    @Transactional
    public Match saveMatch(Match match) throws DataAccessException {
        matchRepository.save(match);
        return match;
    }

    @Transactional(readOnly = true)
    public List<Match> findMatchsByPlayer(String username){
        return (List<Match>) matchRepository.findMatchsByPlayer(username);
    }

    @Transactional(readOnly = true)
    public Match findMatchById(Integer id){
        return matchRepository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<Match> findMatchsClosedByPlayer(String p){
        return (List<Match>) matchRepository.findMatchsClosedByPlayer(p);
    }  

    @Transactional(readOnly = true)
    public List<Match> findAllOpenList(){
        return (List<Match>) matchRepository.findAllOpen();
    }


    @Transactional(readOnly = true)
    public GameBoard findGameBoardByPlayerId(Integer id){
        Optional<GameBoard> g = matchRepository.findBoardByPlayer(id);
        return g.get()==null?null:g.get();
    }

    @Transactional
	public void deleteMatch(int id) throws DataAccessException {
		Match toDelete = findMatchById(id);
		matchRepository.delete(toDelete);
	}
}
