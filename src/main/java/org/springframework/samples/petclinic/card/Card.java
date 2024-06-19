package org.springframework.samples.petclinic.card;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.samples.petclinic.model.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cards")
public class Card extends BaseEntity {

	@Column(name = "name")
	@NotEmpty
	private String nombre;

	@Column(name = "action")
	@NotEmpty
	private String action;

	@Column(name = "value")
	private String value;
	
	@Column(name = "category")
	private String category;

	@Column(name = "bullet")
	private Integer bullet;
	
	@Column(name = "accuracy")
	private Integer accuracy;

	@Column(name = "discart")
	private String discart;

}
