package org.springframework.samples.petclinic.board;


import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.territory.Territory;
import org.springframework.transaction.annotation.Transactional;

public class GameBoardService {
    
    private GameBoardRepository gameBoardRepository;

    @Autowired
    public GameBoardService(GameBoardRepository gameBoardRepository){
        this.gameBoardRepository = gameBoardRepository;
    }

    @Transactional(readOnly = true)
    public Integer getScoreCriteryA6(GameBoard gb){
        Set<Territory> terrs = gb.getTerritories();
    }
}
