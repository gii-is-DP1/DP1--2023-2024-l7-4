package org.springframework.samples.petclinic.match.chat;

import java.util.Date;

import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.CascadeType;
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
@Table(name = "chatMessages")
public class ChatMessage extends BaseEntity {

    private String message;

    @Column(name = "playerNumber")
    private Integer playerNumber;

    private Date date;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "match_id")
    @NotNull
    private Match match;

}
