package org.springframework.samples.petclinic.board;

import java.util.HashSet;
import java.util.LinkedList;
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
        Set<Territory> terrs = gb.getTerritories(); // cogemos territorios
        Integer res = 0; // inicializamos resultado
        for (Territory t: terrs){ // para cada territorio del tablero... 
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.CASTLE && adjacencies.size()==6){  // Chequeamos que el territorio sea un castillo y tenga 6 celdas adyacentes
                if(terrs.stream().filter(territory -> adjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() != null).toList().size() == 6){
                    res+=2;
                }
            }
        }
        return res;
    }


    @Transactional
    public Integer getScoreCriteryA2(GameBoard gb) {
       Set<Territory> terrs = gb.getTerritories();
       Integer res = 0;
       for (Territory t: terrs){
           Set<Integer> idAdjacencies = t.getCell().getAdjacencies();
           if (t.getTerritoryType()==TerritoryType.FIELD && idAdjacencies.size()>=2) {
               if (terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.MOUNTAIN).count() >= 1
               && terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.RIVER).count() >= 1){
                    if(terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.FOREST).count() >= 1) {
                        res +=4;
                    }else {
                        res +=3;
                    }
                }
            }
       
        }
        return res;
    }
    @Transactional
    public Integer getScoreCriteryA6(GameBoard gb) {
        Set<Territory> terrs = gb.getTerritories(); // cogemos territorios
        Integer res = 0; // inicializamos resultado
        for (Territory t: terrs){ // para cada territorio del tablero... 
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.MOUNTAIN && adjacencies.size()<=4){  // Chequeamos que el territorio sea un castillo y tenga 6 celdas adyacentes 
                res+=1;
            }
        }
        return res;
    }

    @Transactional
    public Integer getScoreCriteryB4(GameBoard gb) {
        Set<Territory> terrs = gb.getTerritories();
        Integer res = 0;
        for (Territory t: terrs){
            Set<Integer> idAdjacencies = t.getCell().getAdjacencies();
            if(t.getTerritoryType()==TerritoryType.CASTLE && idAdjacencies.size()>=5){
                if(terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType()==TerritoryType.FIELD).count()==1 
                && terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType()==TerritoryType.FOREST).count()==1
                && terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType()==TerritoryType.MOUNTAIN).count()==1
                && terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType()==TerritoryType.RIVER).count()==1
                && terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType()==TerritoryType.VILLAGE).count()==1){
                    res+=12;
                }
            }
        }
        return res;
    }

    @Transactional
    public Integer getScoreCriteryB5(GameBoard gb) {
        Set<Territory> terrs = gb.getTerritories();
        Integer res = 0;
        for (Territory t: terrs){
            Set<Integer> idAdjacencies = t.getCell().getAdjacencies();
            if(t.getTerritoryType()==TerritoryType.RIVER && idAdjacencies.size()>=2){
                if(terrs.stream().filter(territory -> idAdjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType()==TerritoryType.FOREST).count()>=2)
                res+=2;
            }
        }
        return res;
    }

/*
    @Transactional
    public Integer getScoreCriteryA5(GameBoard gb) {
        Integer res = 0;
        Set<Territory> territories = gb.getTerritories();
        Set<Territory> processedTerritories = new HashSet<>();

        for (Territory territory : territories) {
            if (territory.getTerritoryType() == TerritoryType.VILLAGE && !processedTerritories.contains(territory)) {
                res += 5; 

                Set<Territory> villageGroup = findConnectedVillages(territory, territories, processedTerritories);

                processedTerritories.addAll(villageGroup);
            }
        }

        return res;
    }

    private Set<Territory> findConnectedVillages(Territory start, Set<Territory> allTerritories, Set<Territory> processed) {
        Set<Territory> villageGroup = new HashSet<>();
        Queue<Territory> queue = new LinkedList<>();

        queue.add(start);

        while (!queue.isEmpty()) {
            Territory current = queue.poll();

            if (current.getTerritoryType() == TerritoryType.VILLAGE) {
                villageGroup.add(current);
            }

            for (Cell adjCell : current.getCell().getAdjacencies()) {
                Territory adjTerritory = findTerritoryByCell(allTerritories, adjCell);
                if (adjTerritory != null && !processed.contains(adjTerritory) && adjTerritory.getTerritoryType() == TerritoryType.VILLAGE) {
                    queue.add(adjTerritory);
                    processed.add(adjTerritory);
                }
            }
        }

        return villageGroup;
    }

    private Territory findTerritoryByCell(Set<Territory> territories, Cell cell) {
        for (Territory t : territories) {
            if (t.getCell().equals(cell)) {
                return t;
            }
        }
        return null;
    }


 */


    
}

