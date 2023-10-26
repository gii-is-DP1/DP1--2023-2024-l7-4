package org.springframework.samples.petclinic.board;

import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "gameBoards")
public class GameBoard extends BaseEntity{
    
}




