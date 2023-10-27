package org.springframework.samples.petclinic.match;

import java.util.Collection;
import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Transactional(readOnly= true)
    public Collection<Match> findAll(){
        return (List<Match>) matchRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Collection<Match> findMatchsByPlayer(String username){
        return (List<Match>) matchRepository.findMatchsByPlayer(username);
    }

    @Transactional(readOnly = true)
    public Collection<Match> findMatchsClosedByPlayer(String p){
        return (List<Match>) matchRepository.findMatchsClosedByPlayer(p);
 
    }
    
    

    @Transactional(readOnly = true)
    public Match findMatchById(int id){
        return matchRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player","ID",id));
    }

    @Transactional(readOnly = true)
    public Boolean existsMatch(int id){
        return !matchRepository.existsMatch(id).isEmpty();
    }

    @Transactional(readOnly = true)
    public Match saveMatch(Match m){
        matchRepository.save(m);
        return m;
    }

    @Transactional(readOnly = true)
    public Match updateMatch(Match m, int id){
        Match toUpdate = findMatchById(id);
        BeanUtils.copyProperties(m, toUpdate, "id");
        return saveMatch(toUpdate);
    }

    @Transactional(readOnly = true)
    public void deleteMatch(int id){
        Match toDelete = findMatchById(id);
        matchRepository.delete(toDelete);
    }
}
