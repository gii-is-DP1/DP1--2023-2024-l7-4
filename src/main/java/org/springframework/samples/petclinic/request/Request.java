package org.springframework.samples.petclinic.request;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Request extends BaseEntity {
    
    @Column(name= "state")
    public RequestState status;

    @ManyToOne()
    Player playerOne;

    @ManyToOne()
    Player playerTwo;


}
