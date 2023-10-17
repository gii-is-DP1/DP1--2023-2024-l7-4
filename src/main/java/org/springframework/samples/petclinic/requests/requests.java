package org.springframework.samples.petclinic.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;

public class requests {
    @Column(name = "state")
	@NotEmpty
	protected Boolean state;
}
