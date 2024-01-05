package com.swaileh.lanapharmacy.models.bill;

import com.swaileh.lanapharmacy.models.drug.Drug;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.constraints.NotNull;
import java.util.Objects;

public class BillItem {

    @DBRef
    @NotNull
    private Drug drug;

    private Double price;

    private Double quantity;

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    @Transient
    public Double getTotalPrice() {
        return this.price * this.quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BillItem billItem = (BillItem) o;

        if (!Objects.equals(drug, billItem.drug)) return false;
        if (!Objects.equals(price, billItem.price)) return false;
        return Objects.equals(quantity, billItem.quantity);
    }

    @Override
    public int hashCode() {
        int result = drug != null ? drug.hashCode() : 0;
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (quantity != null ? quantity.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "BillItem{" +
            "drug=" + drug +
            ", price=" + price +
            ", quantity=" + quantity +
            '}';
    }
}
