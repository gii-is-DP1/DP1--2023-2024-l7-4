package org.springframework.samples.petclinic.territory;

import org.springframework.samples.petclinic.board.GameBoard;
import org.springframework.samples.petclinic.model.BaseEntity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "territories")
public class Territory extends BaseEntity{
    
    @ManyToOne
    @JoinColumn
    @NotNull
    Cell cell;

    @Column(name = "type")
    @NotNull
    TerritoryType territoryType;

    @ManyToOne
    @JoinColumn(name = "gameBoard")
    @NotNull
    GameBoard gameBoard;

}
