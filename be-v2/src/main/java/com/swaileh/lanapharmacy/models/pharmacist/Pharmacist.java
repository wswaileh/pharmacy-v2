package com.swaileh.lanapharmacy.models.pharmacist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swaileh.lanapharmacy.models.BaseEntityModel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Document(collection = "pharmacists")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Pharmacist extends BaseEntityModel {

    @NotNull
    private String name;

    private String username;

    @JsonIgnore
    private String password;

    private String role;
}
