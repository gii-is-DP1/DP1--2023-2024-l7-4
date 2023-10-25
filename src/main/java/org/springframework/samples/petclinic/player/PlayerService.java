package org.springframework.samples.petclinic.player;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
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

    @Transactional(readOnly = true)
	public Player findPlayerById(int id) throws DataAccessException {
		return this.playerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player", "ID", id));
	}

    @Transactional
	public Player savePlayer(Player player) throws DataAccessException {
		playerRepository.save(player);
		return player;
	}

    @Transactional
    public Player updatePlayer(Player player, int id) throws DataAccessException {
        Player toUpdate = findPlayerById(id);
        BeanUtils.copyProperties(player, toUpdate, "id");
        return savePlayer(toUpdate);
    }

    @Transactional
    public void deletePlayer( int id) throws DataAccessException {
        Player toDelete = findPlayerById(id);
        playerRepository.delete(toDelete);
    }

    public Boolean existsPlayer(String username) {
        return !playerRepository.existsPlayer(username).isEmpty();
    }

}
