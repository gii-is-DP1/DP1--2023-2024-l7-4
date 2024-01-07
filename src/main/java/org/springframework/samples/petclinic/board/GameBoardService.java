package org.springframework.samples.petclinic.board;


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


    @Transactional(readOnly = true)
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


    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
    public Integer getScoreCriteryA3(GameBoard gb){
        Set<Territory> terrs = gb.getTerritories();
        Map<Territory,Integer> grupoBosqueCont = new HashMap<>();
        Integer res = 0;
        for(Territory t: terrs){
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.FOREST){  // Chequeamos que el territorio sea una bosque
                Integer bosqueCount = terrs.stream().filter(territory -> adjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.FOREST).toList().size();
                grupoBosqueCont.put(t, bosqueCount);
                }    
        }if(grupoBosqueCont.values().stream().filter(x -> x>=2).count()>=2){
            res = grupoBosqueCont.values().stream().min(Integer::compareTo).orElse(0);
            res *= 2;
        }
        return res;
    }  

    @Transactional(readOnly = true)
    public Integer getScoreCritA4(GameBoard gb){
        Set<Territory> terrs = gb.getTerritories();
        Set<Territory> linea = new HashSet<>();
        Integer res = 0;
        for(Territory t: terrs){
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.FIELD || t.getTerritoryType()==TerritoryType.RIVER){
                linea.add(t);
            }
        }//LINEAS HORIZONTALES CON RESPECTO AL EJE Z
        if (linea.stream().filter(territory -> territory.getCell().getZ() == 4)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == 3)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == 2)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == 1)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == 0)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == -1)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == -2)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == -3)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getZ() == -4)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }
        //LINEAS DIAGONALES CON RESPECTO AL EJE X
        if (linea.stream().filter(territory -> territory.getCell().getX() == 4)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == 3)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == 2)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == 1)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == 0)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == -1)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == -2)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == -3)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getX() == -4)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }
         //LINEAS DIAGONALES CON RESPECTO AL EJE Y
        if (linea.stream().filter(territory -> territory.getCell().getY() == 4)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == 3)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == 2)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == 1)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == 0)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == -1)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == -2)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == -3)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }if (linea.stream().filter(territory -> territory.getCell().getY() == -4)
        .filter(territory -> territory.getTerritoryType() == TerritoryType.RIVER ||  territory.getTerritoryType()==TerritoryType.FIELD).collect(Collectors.toSet()).size() == 2) {
            res += 2;
        }
        return res;
    }


    @Transactional(readOnly = true)
    public Integer getScoreCriteryA5(GameBoard gb) {
        Set<Territory> terrs = gb.getTerritories(); // cogemos territorios
        Integer res = 0; // inicializamos resultado
        Map<Territory,Integer> grupoPueblosCont = new HashMap<>();
        for (Territory t: terrs){ // para cada territorio del tablero... 
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.VILLAGE){
                Integer pueblosCount = terrs.stream().filter(territory -> adjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.VILLAGE).toList().size();
                grupoPueblosCont.put(t, pueblosCount);
            }
        }
        res = grupoPueblosCont.values().stream().toList().size();

        return res;
    }


    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
    public Integer getScoreCriteryB1(GameBoard gb){
        Set<Territory> terrs = gb.getTerritories();
        Map<Territory,Integer> grupoMontañasCont = new HashMap<>();
        Integer res = 0;
        for(Territory t: terrs){
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.MOUNTAIN){  // Chequeamos que el territorio sea una montaña
                Integer mountainCount = terrs.stream().filter(territory -> adjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.MOUNTAIN).toList().size();
                grupoMontañasCont.put(t, mountainCount);
                }    
        }if(grupoMontañasCont.values().stream().filter(x -> x>=2).count()>=2){
            res = grupoMontañasCont.values().stream().max(Integer::compareTo).orElse(0);
        }
        return res;
    }    

    @Transactional(readOnly = true)
    public Integer getScoreCritB2(GameBoard gb){
        Set<Territory> terrs = gb.getTerritories();
        Integer res = 0;
        for(Territory t: terrs){
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.FIELD){
                if (terrs.stream().filter(territory -> adjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.VILLAGE).count()>0) {
                    res += 1;
                    if(terrs.stream().filter(territory -> adjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType() == TerritoryType.CASTLE).count()==2){
                        res += 3;
                    }
                }
            }
        }
        return res;
    }

    @Transactional(readOnly = true)
    public Integer getScoreCritB3(GameBoard gb){
        Set<Territory> terrs = gb.getTerritories();
        Set<Territory> bosque = new HashSet<>();
        Integer res = 0;
        for(Territory t: terrs){
            Set<Integer> adjacencies = t.getCell().getAdjacencies(); // cogemos las adyacencias
            if(t.getTerritoryType()==TerritoryType.FOREST){
                bosque.add(t);
            }
        }//LINEAS HORIZONTALES CON RESPECTO AL EJE Z
        if (bosque.stream().filter(territory -> territory.getCell().getZ() == 4).count()==5) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == 3).count()==6) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == 2).count()==7) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == 1).count()==8) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == 0).count()==9) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == -1).count()==8) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == -2).count()==7) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == -3).count()==6) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getZ() == -4).count()==5) {
            res += 10;
        }
        //LINEAS DIAGONALES CON RESPECTO AL EJE X
        if (bosque.stream().filter(territory -> territory.getCell().getX() == 4).count()==5) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == 3).count()==6) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == 2).count()==7) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == 1).count()==8) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == 0).count()==9) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == -1).count()==8) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == -2).count()==7) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == -3).count()==6) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getX() == -4).count()==5) {
            res += 10;
        }
         //LINEAS DIAGONALES CON RESPECTO AL EJE Y
        if (bosque.stream().filter(territory -> territory.getCell().getY() == 4).count()==5) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == 3).count()==6) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == 2).count()==7) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == 1).count()==8) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == 0).count()==9) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == -1).count()==8) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == -2).count()==7) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == -3).count()==6) {
            res += 10;
        }if (bosque.stream().filter(territory -> territory.getCell().getY() == -4).count()==5) {
            res += 10;
        }
        return res;
    }

        
   

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
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

     @Transactional(readOnly = true)
    public Integer getScoreCriteryB6(GameBoard gb){
        Set<Territory> terrs = gb.getTerritories();
        Integer res = 0;
        for (Territory t: terrs){
            Set<Integer> Adjacencies = t.getCell().getAdjacencies();
            if(t.getTerritoryType()==TerritoryType.VILLAGE){
                if(terrs.stream().filter(territory -> Adjacencies.contains(territory.getCell().getId()) && territory.getTerritoryType()==TerritoryType.VILLAGE).count()==0){
                    Set<TerritoryType> tipos = terrs.stream().filter(territory -> Adjacencies.contains(territory.getCell().getId())).map( x-> x.getTerritoryType()).collect(Collectors.toSet());
                    if(tipos.contains(TerritoryType.RIVER) && tipos.contains(TerritoryType.FOREST) && tipos.contains(TerritoryType.MOUNTAIN)){
                        res += 8;
                    }
                }
        }
        
    }
    return res;
}



    
}

