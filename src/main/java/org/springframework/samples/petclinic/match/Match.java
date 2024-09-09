package org.springframework.samples.petclinic.match;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "matches")
public class Match extends BaseEntity {

    @Column
    @NotBlank
    @NotNull
    private String name;

    @ElementCollection
    @CollectionTable(name = "joined_players", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "player")
    @Size(max = 2, message = "The match can have at most 2 players")
    private List<String> joinedPlayers;

    @Column(name = "matchState")
    @Enumerated(EnumType.STRING)
    private MatchState matchState;

    @Column(name="deck")
    private List<Integer> deck;

    @Column
    private String winner;

    @Column(name = "start_date")
	@DateTimeFormat(pattern = "yyyy/MM/dd HH/mm/ss")
    private LocalDateTime startDate;

    @Column(name = "finish_date")
	@DateTimeFormat(pattern = "yyyy/MM/dd HH/mm/ss")
    private LocalDateTime finishDateTime;
}
