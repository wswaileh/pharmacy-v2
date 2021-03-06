package com.swaileh.lanapharmacy.models.drug;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.util.Objects;

@Document(collection = "drugs")
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

    public Long getBarcode() {
        return barcode;
    }

    public void setBarcode(Long barcode) {
        this.barcode = barcode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Double costPrice) {
        this.costPrice = costPrice;
    }

    public Double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Drug drug = (Drug) o;

        if (!Objects.equals(barcode, drug.barcode)) return false;
        if (!Objects.equals(name, drug.name)) return false;
        if (!Objects.equals(costPrice, drug.costPrice)) return false;
        if (!Objects.equals(sellingPrice, drug.sellingPrice)) return false;
        if (!Objects.equals(quantity, drug.quantity)) return false;
        return Objects.equals(company, drug.company);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (barcode != null ? barcode.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (costPrice != null ? costPrice.hashCode() : 0);
        result = 31 * result + (sellingPrice != null ? sellingPrice.hashCode() : 0);
        result = 31 * result + (quantity != null ? quantity.hashCode() : 0);
        result = 31 * result + (company != null ? company.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Drug{" +
            "id=" + id +
            ", barcode=" + barcode +
            ", name='" + name + '\'' +
            ", costPrice=" + costPrice +
            ", sellingPrice=" + sellingPrice +
            ", quantity=" + quantity +
            ", company='" + company + '\'' +
            '}';
    }
}
