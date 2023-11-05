package org.springframework.samples.petclinic.match;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
    public List<Match> findMatchsClosedByPlayer(String p){
        return (List<Match>) matchRepository.findMatchsClosedByPlayer(p);
 
    }  
}
