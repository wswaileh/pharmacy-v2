package com.swaileh.lanapharmacy.models;

import lombok.*;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class BaseEntityModel {

    @Id
    protected String id;

}
