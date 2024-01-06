package com.swaileh.lanapharmacy.models.bill;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Document(collection = "bills")
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Bill extends BaseEntityModel {

    @NotEmpty
    private List<BillItem> items;

    @NotNull
    private Pharmacist pharmacist;

    @NotNull
    private Integer time;

    @Transient
    @JsonIgnore
    private Double total;

    private Double discountPercentage;

    private Double discountAmount;

    @JsonProperty("total")
    public Double calculateTotal() {
        Double totalCalculated = 0.0;
        for (BillItem billItem : items) {
            totalCalculated += billItem.getTotalPrice();
        }
        totalCalculated = Objects.nonNull(discountPercentage) ? totalCalculated * ((100 - discountPercentage) / 100) : totalCalculated;
        totalCalculated = Objects.nonNull(discountAmount) ? totalCalculated - discountAmount : totalCalculated;
        this.total = totalCalculated;
        return totalCalculated;
    }
}
