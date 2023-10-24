package org.springframework.samples.petclinic.player;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.samples.petclinic.userKingdom.UserKingdom;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter; 

import org.springframework.samples.petclinic.model.BaseEntity;

@Entity
@Getter
@Setter
@Table(name = "friendships")
public class Friendship extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Player sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Player receiver;

    // Otros campos y métodos relevantes
        
}
