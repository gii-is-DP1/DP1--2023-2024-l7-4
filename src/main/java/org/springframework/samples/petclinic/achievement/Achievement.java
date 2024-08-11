package org.springframework.samples.petclinic.achievement;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;


import org.springframework.samples.petclinic.model.NamedEntity;


import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "achievement")
@Getter
@Setter
public class Achievement extends NamedEntity {

    @Column(name = "description")
    @NotEmpty
    private String description;

    //IMAGES

    @Column(name = "metric")
    @NotNull
    private Integer metric;

    @Column(name = "threshold")
    @NotNull
    private Threshold threshold;

}

