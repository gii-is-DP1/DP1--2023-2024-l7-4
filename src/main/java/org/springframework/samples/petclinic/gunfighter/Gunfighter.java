package org.springframework.samples.petclinic.gunfighter;

import java.util.List;

import org.springframework.samples.petclinic.match.Match;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

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
@Table(name = "gunfighters")
public class Gunfighter extends BaseEntity {

    @Column
    private Integer health = 2;

    @Column
    private Integer bullets = 2;

    @Column(name = "bulletsChange")
    private Boolean bulletsChange = true;

    @Column
    private Integer precision = 2;

    @Column(name = "precisionBefore")
    private Integer precisionBefore = -1;

    @Column(name = "precisionChange")
    private Boolean precisionChange = true;

    @Column(name = "winPrecision")
    private Integer winPrecision = 0;

    @Column
    private List<Integer> cards;

    @Column(name = "cardPlayed")
    private Integer cardPlayed = -1;

    @Column(name = "cardPlayedBefore")
    private Integer cardPlayedBefore;

    @Column(name = "preventDamage")
    private Boolean preventDamage = false;

    @Column
    private Integer failing = 0;

    @Column(name = "recievex2damage")
    private Boolean recievex2damage = false;

    @Column(name = "intimidationCardInHand")
    private Boolean intimidationCardInHand = false;

    @Column(name = "playerNumber")
    private Integer playerNumber;

    @Column(name = "doubleCard")
    private Boolean doubleCard = false;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "player_id")
    @NotNull
    Player player;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "match_id")
    @NotNull
    Match match;
}
