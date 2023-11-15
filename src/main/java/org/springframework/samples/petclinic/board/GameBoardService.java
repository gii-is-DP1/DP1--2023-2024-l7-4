package org.springframework.samples.petclinic.board;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GameBoardService {
    

    private GameBoardRepository gameBoardRepository;

    public GameBoardService(GameBoardRepository gameBoardRepository){
        this.gameBoardRepository = gameBoardRepository;
    }


    @Transactional(readOnly = true)
    public GameBoard findBoardByPlayerAndMatch(Integer playerId, Integer matchId){
        return gameBoardRepository.findBoardByPlayerAndMatch(playerId, matchId).orElse(null);
    }

    @Transactional
    public GameBoard save(GameBoard gb){
        gameBoardRepository.save(gb);
        return gb;
    }

}
