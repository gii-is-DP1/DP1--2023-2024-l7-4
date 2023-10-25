package org.springframework.samples.petclinic.requests;

import org.springframework.samples.petclinic.model.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="requests")
public class requests extends BaseEntity{
    
	@Column(name = "state")
	@NotEmpty
	protected Boolean state;
}
