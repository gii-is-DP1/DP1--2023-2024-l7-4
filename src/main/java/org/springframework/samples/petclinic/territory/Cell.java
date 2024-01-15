
package org.springframework.samples.petclinic.territory;

import java.util.Set;

import org.springframework.samples.petclinic.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(name = "adjacencies")
    Set<Integer> adjacencies;
  
}

