package com.swaileh.lanapharmacy.models.notification;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.drug.Drug;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class ExpiryNotification extends BaseEntityModel implements Comparable<ExpiryNotification> {

    @DBRef
    private Drug expiringDrug;

    private Date reminderDate;

    @Override
    public int compareTo(ExpiryNotification o) {
        if (getReminderDate() == null || o.getReminderDate() == null)
            return 0;
        return this.getReminderDate().compareTo(o.getReminderDate());
    }
}
