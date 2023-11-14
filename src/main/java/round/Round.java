package round;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.player.Player;

import com.fasterxml.jackson.databind.deser.DataFormatReaders.Match;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "rounds")
public class Round extends BaseEntity {

    @JoinColumn(name = "players", referencedColumnName = "id")
    private Player JugadorActivo;





    
}
