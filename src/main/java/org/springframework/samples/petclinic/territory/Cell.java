
package org.springframework.samples.petclinic.territory;

import java.util.Set;

import org.springframework.samples.petclinic.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cells")
public class Cell extends BaseEntity{

    @Column(name = "x")
    private Integer x;

    @Column(name = "y")
    private Integer y;
  
    @Column(name = "z")
    private Integer z;

    @ManyToMany
    @JoinColumn(name = "Adjacencies")
    Set<Cell> adjacencies;
  
  
  
  
    /*
    public Cell(Position position){
        this.position = position;
    }

    public Cell of(Position position){
        return new Cell(position);
    }


    public Set<Cell> getAdjacencies(){
        Set<Cell> adjacencies = Set.of();
        if(this.position.maxCells()==1){
            if(this.position.maxCellX()){
                adjacencies.add(new Cell(new Position(this.position.x(), this.position.y()-1, this.position.z()+1)));
                adjacencies.add(new Cell(new Position(this.position.x(), this.position.y()+1, this.position.z()-1)));
                adjacencies.add(new Cell(new Position(this.position.x()+1, this.position.y(), this.position.z()-1)));
                adjacenci
            }if(this.position.maxCellY()){
                
            }if(this.position.maxCellZ()){
                
            }
            adjacencies.add(null)
        }else if(this.position.maxCells()==2){

        }else{  
            adjacencies.add(new Cell(new Position(this.position.x(), this.position.y()-1, this.position.z()+1)));
            adjacencies.add(new Cell(new Position(this.position.x(), this.position.y()+1, this.position.z()-1)));
            adjacencies.add(new Cell(new Position(this.position.x()+1, this.position.y(), this.position.z()-1)));
            adjacencies.add(new Cell(new Position(this.position.x()-1, this.position.y(), this.position.z()+1)));
            adjacencies.add(new Cell(new Position(this.position.x()+1, this.position.y()-1, this.position.z())));
            adjacencies.add(new Cell(new Position(this.position.x()-1, this.position.y()+1, this.position.z())));
        }
        return adjacencies;
    }

/*
    public void setupCells(){
            for(int x=0; x<5; x++){
                for(int y=0; y<5; y++){
                    for(int z=0; z<5; z++){
                        new Cell(new Position(x, y, z));
                    }
                }
            }
    }
 */
}

