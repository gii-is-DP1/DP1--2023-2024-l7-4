package org.springframework.samples.petclinic.board;

import java.util.List;
import java.util.Set;

import org.springframework.samples.petclinic.territory.Cell;
import org.springframework.samples.petclinic.territory.Territory;
import org.springframework.samples.petclinic.territory.TerritoryType;
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


    @Transactional
    public Integer getScoreCriteryA1(GameBoard gb) {
        Set<Territory> terrs = gb.getTerritories();
        Integer res = 0;
        for (Territory t: terrs){
            Set<Cell> adjacencies = t.getCell().getAdjacencies();
            if(t.getTerritoryType()==TerritoryType.CASTLE && adjacencies.size()==6){
                List<Integer> idAdjacencies = adjacencies.stream().map(c -> c.getId()).toList();
                if(terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() != null).toList().size() == 6){
                    res+=2;
                }
            }
        }
        return res;
    }





    
}
