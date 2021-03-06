package com.swaileh.lanapharmacy.models.notification;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.drug.Drug;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
import java.util.List;
import java.util.Objects;

public class ExpiryNotification extends BaseEntityModel implements Comparable<ExpiryNotification> {

    @DBRef
    private Drug expiringDrug;

    private Date reminderDate;

    private Boolean read;

    public Drug getExpiringDrug() {
        return expiringDrug;
    }

    public void setExpiringDrug(Drug expiringDrug) {
        this.expiringDrug = expiringDrug;
    }

    public Date getReminderDate() {
        return reminderDate;
    }

    public void setReminderDate(Date reminderDate) {
        this.reminderDate = reminderDate;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        ExpiryNotification that = (ExpiryNotification) o;

        if (!Objects.equals(expiringDrug, that.expiringDrug)) return false;
        if (!Objects.equals(reminderDate, that.reminderDate)) return false;
        return Objects.equals(read, that.read);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (expiringDrug != null ? expiringDrug.hashCode() : 0);
        result = 31 * result + (reminderDate != null ? reminderDate.hashCode() : 0);
        result = 31 * result + (read != null ? read.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ExpiryNotification{" +
            "expiringDrug=" + expiringDrug +
            ", reminderDate=" + reminderDate +
            ", read=" + read +
            '}';
    }

    @Override
    public int compareTo(ExpiryNotification o) {
        if (getReminderDate() == null || o.getReminderDate() == null)
            return 0;
        return this.getReminderDate().compareTo(o.getReminderDate());
    }
}
