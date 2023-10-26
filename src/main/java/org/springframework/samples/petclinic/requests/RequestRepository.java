package org.springframework.samples.petclinic.requests;

import java.util.Collection;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RequestRepository extends CrudRepository<requests, Integer> {

    @Query("SELECT r.requestPlayer FROM Request r WHERE r.requestPlayer.id = :playerId ")
public Collection<requests> getPlayerRequests(Integer playerId);

    
}
