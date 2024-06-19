package org.springframework.samples.petclinic.card;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import org.springframework.samples.petclinic.model.BaseEntity;


import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "card")
public class Card extends BaseEntity {

	@Column(name = "name")
	@NotEmpty
	private String nombre;

	@Column(name = "action")
	@NotEmpty
	private String action;

	@Column(name = "card_value")
	private String value;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "category")
	@NotNull
	private Category category;

	@Column(name = "bullet")
	private Integer bullet;
	
	@Column(name = "accuracy")
	private Integer accuracy;

	@Column(name = "discart")
	private Boolean discart;

	
}
