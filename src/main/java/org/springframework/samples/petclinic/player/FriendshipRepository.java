package org.springframework.samples.petclinic.player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    // Puedes definir consultas personalizadas si es necesario
    Friendship findBySenderAndReceiver(Player sender, Player receiver);
}
