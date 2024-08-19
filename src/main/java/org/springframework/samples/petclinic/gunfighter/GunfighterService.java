package org.springframework.samples.petclinic.gunfighter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GunfighterService {

    private GunfighterRepository gunfighterRepository;

    @Autowired
    public GunfighterService(GunfighterRepository gunfighterRepository) {
        this.gunfighterRepository = gunfighterRepository;
    }

    @Transactional
    public Gunfighter save(Gunfighter g) {
        return gunfighterRepository.save(g);
    }

    @Transactional
    public Gunfighter findByMatchAndGunfighter(Integer matchId, Integer gunfighterId) {
        return gunfighterRepository.findGunfighter(gunfighterId, matchId).orElse(null);
    }

    @Transactional
    public void resetState(Gunfighter gunfighter) {
        gunfighter.setCardPlayedBefore(gunfighter.getCardPlayed());
        gunfighter.setCardPlayed(-1);
        gunfighter.setRecievex2damage(false);
        gunfighter.setPrecisionChange(true);
        gunfighter.setBulletsChange(true);
        gunfighter.setIntimidationCardInHand(gunfighter.getCards().contains(45));
        gunfighter.setFailing(gunfighter.getFailing() > 0 ? gunfighter.getFailing() - 1 : gunfighter.getFailing());
        gunfighter.setWinPrecision(
                gunfighter.getWinPrecision() > 0 ? gunfighter.getWinPrecision() - 1 : gunfighter.getWinPrecision());
        this.save(gunfighter);
            }
    
}
