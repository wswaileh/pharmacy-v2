package com.swaileh.lanapharmacy.models.bill;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "bills")
public class Bill extends BaseEntityModel {

    private List<BillItem> items;

    private Pharmacist pharmacist;

    private Integer time;

    @Transient
    @JsonIgnore
    private Double total;

    private Double discountPercentage;

    private Double discountAmount;

    public List<BillItem> getItems() {
        return items;
    }

    public void setItems(List<BillItem> items) {
        this.items = items;
    }

    public Pharmacist getPharmacist() {
        return pharmacist;
    }

    public void setPharmacist(Pharmacist pharmacist) {
        this.pharmacist = pharmacist;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    @JsonProperty("total")
    public Double calculateTotal() {
        Double total = 0.0;
        for (BillItem billItem : items) {
            total += billItem.getTotalPrice();
        }
        total = discountPercentage != null ? total * ((100 - discountPercentage) / 100) : total;
        total = discountAmount != null ? total - discountAmount : total;
        this.total = total;
        return total;
    }

    public Double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Bill bill = (Bill) o;

        if (!Objects.equals(items, bill.items)) return false;
        if (!Objects.equals(pharmacist, bill.pharmacist)) return false;
        if (!Objects.equals(time, bill.time)) return false;
        if (!Objects.equals(total, bill.total)) return false;
        if (!Objects.equals(discountPercentage, bill.discountPercentage))
            return false;
        return Objects.equals(discountAmount, bill.discountAmount);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (items != null ? items.hashCode() : 0);
        result = 31 * result + (pharmacist != null ? pharmacist.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (total != null ? total.hashCode() : 0);
        result = 31 * result + (discountPercentage != null ? discountPercentage.hashCode() : 0);
        result = 31 * result + (discountAmount != null ? discountAmount.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Bill{" +
            "id=" + id +
            ", items=" + items +
            ", pharmacist=" + pharmacist +
            ", time=" + time +
            ", total=" + total +
            ", discountPercentage=" + discountPercentage +
            ", discountAmount=" + discountAmount +
            '}';
    }
}
