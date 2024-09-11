package org.springframework.samples.petclinic.request;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Request extends BaseEntity {
    
    @Column(name= "status")
    @Enumerated(EnumType.STRING)
    RequestState status;

    @ManyToOne(optional=false)
    Player playerOne;

    @ManyToOne(optional=false)
    Player playerTwo;


}
