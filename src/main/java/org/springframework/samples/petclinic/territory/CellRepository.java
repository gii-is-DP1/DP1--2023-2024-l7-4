package org.springframework.samples.petclinic.territory;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CellRepository extends CrudRepository<Cell, Integer>{

    @Query("SELECT c FROM Cell c")
    public List<Cell> findAll();
}
