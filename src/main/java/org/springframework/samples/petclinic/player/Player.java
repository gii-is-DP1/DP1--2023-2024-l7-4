package org.springframework.samples.petclinic.player;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.samples.petclinic.userKingdom.UserKingdom;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter; 

@Entity
@Getter
@Setter
@Table(name = "players")
public class Player extends UserKingdom{

	@Column(name = "total_score")
    Integer total_score;

    @Column(name = "total_bloqs")
	Integer total_bloqs;
    
}