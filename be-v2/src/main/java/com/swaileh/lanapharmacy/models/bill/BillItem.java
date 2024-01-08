package com.swaileh.lanapharmacy.models.bill;

import com.swaileh.lanapharmacy.models.drug.Drug;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class BillItem {

    @DBRef
    @NotNull
    private Drug drug;

    private Double price;

    private Double quantity;

    @Transient
    public Double getTotalPrice() {
        return this.price * this.quantity;
    }

}
