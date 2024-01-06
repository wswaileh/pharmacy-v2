package com.swaileh.lanapharmacy.models.drug;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;

@Document(collection = "drugs")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Drug extends BaseEntityModel {

    @NotNull
    private Long barcode;

    @NotNull
    private String name;

    @Field("cost_price")
    private Double costPrice;

    @Field("selling_price")
    private Double sellingPrice;

    private Double quantity;

    private String company;

}
