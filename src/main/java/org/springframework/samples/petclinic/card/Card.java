package org.springframework.samples.petclinic.card;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import org.springframework.samples.petclinic.model.BaseEntity;


import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cards")
public class Card extends BaseEntity{

    @Column(name = "name")
	@NotBlank
	private String name;

    @Column(name = "action")
	@NotBlank
	private String action;

	@Column(name = "card_value")
	private String value;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "category")
	@NotNull
	private Category category;

	@Column(name = "bullet")
	@NotNull
	private Integer bullet;

	@Column(name = "accuracy")
	@NotNull
	private Integer accuracy;

    @Column(name = "discart")
	@NotEmpty
	private String discart;

	
}
