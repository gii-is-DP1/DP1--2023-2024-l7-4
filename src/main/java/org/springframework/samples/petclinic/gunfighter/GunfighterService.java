package org.springframework.samples.petclinic.gunfighter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class GunfighterService {
    

    private GunfighterRepository gunfighterRepository;

    @Autowired
    public GunfighterService(GunfighterRepository gunfighterRepository){
        this.gunfighterRepository = gunfighterRepository;
    }

    @Transactional
    public Gunfighter save(Gunfighter g){
        return gunfighterRepository.save(g);
    }

    @Transactional
    public Gunfighter findByMatchAndGunfighter(Integer matchId, Integer gunfighterId){
        return gunfighterRepository.findGunfighter(gunfighterId, matchId).orElse(null);
    }
}
