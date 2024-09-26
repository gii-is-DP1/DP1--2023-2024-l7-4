package org.springframework.samples.petclinic.match.chat;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends CrudRepository<ChatMessage, Integer> {

    @Query("SELECT c FROM ChatMessage c WHERE c.match.id = :matchId")
    public List<ChatMessage> findAllByMatchId(Integer matchId);
}
