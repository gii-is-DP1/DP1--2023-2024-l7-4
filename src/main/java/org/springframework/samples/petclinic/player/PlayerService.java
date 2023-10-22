package org.springframework.samples.petclinic.player;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlayerService {
    

    private PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository){
        this.playerRepository = playerRepository;
    }

    @Transactional(readOnly = true)
	public Collection<Player> findAll() {
		return (List<Player>) playerRepository.findAll();
	}

    @Transactional(readOnly = true)
    public Collection<Player> sortedPlayersByPuntuation(){
        return (List<Player>) playerRepository.sortedPlayersByPuntuation();
    }

    public Object existsPlayer(String username) {
        if(playerRepository.existsPlayer(username) != null){ return true; }
        else{ return false; }        
    }

}
