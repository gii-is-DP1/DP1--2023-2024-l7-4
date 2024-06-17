package org.springframework.samples.petclinic.card;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.user.User;

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

	@Column(name = "value")
	private String value;
	
	@Column(name = "category")
	private Category category;

	@Column(name = "bullet")
	private Integer bullet;
	
	@Column(name = "accuracy")
	private Integer accuracy;

	@Column(name = "Discart")
	private Boolean Discart;

}
