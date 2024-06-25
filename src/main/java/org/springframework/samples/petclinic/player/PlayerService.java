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
	public List<Player> findAll() {
		return (List<Player>) playerRepository.findAll();
	}

 

    @Transactional(readOnly = true)
	public Player findPlayer(int id) throws DataAccessException {
		return this.playerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player", "id", id));
	}


    @Transactional
	public Player savePlayer(Player player) throws DataAccessException {
		playerRepository.save(player);
		return player;
	}

    @Transactional
    public Player updatePlayer(Player player, int id) throws DataAccessException {
        Player toUpdate = findPlayer(id);
        BeanUtils.copyProperties(player, toUpdate, "id");
        return savePlayer(toUpdate);
    }

    @Transactional
    public void deletePlayer( int id) throws DataAccessException {
        Player toDelete = findPlayer(id);
        playerRepository.delete(toDelete);
    }

}