package com.swaileh.lanapharmacy.models;

import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;

public enum Entities {

    DRUG("Drug", Drug.class),
    NOTIFICATION("Notification", ExpiryNotification.class),
    BILL("Bill", Bill.class),
    PHARMACIST("Pharmacist", Pharmacist.class);

    private final String entityName;
    private final Class<?> entityClass;

    Entities(String entityName, Class<?> entityClass) {
        this.entityName = entityName;
        this.entityClass = entityClass;
    }

    public String getEntityName() {
        return entityName;
    }

    public Class<?> getEntityClass() {
        return entityClass;
    }

    public static Entities getEntityByEntityName(String entityName) {
        for (Entities entity : Entities.values()) {
            if (entity.entityName.equals(entityName)) {
                return entity;
            }
        }
        return null;
    }

    public static Entities getEntityByClass(Class<?> clazz) {
        for (Entities entity : Entities.values()) {
            if (entity.entityClass.equals(clazz)) {
                return entity;
            }
        }
        return null;
    }
}

