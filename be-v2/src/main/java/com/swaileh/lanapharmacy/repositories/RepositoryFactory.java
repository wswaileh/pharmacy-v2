package com.swaileh.lanapharmacy.repositories;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Waleed Swaileh
 */
@Component
public class RepositoryFactory {

    private Map<Class<? extends BaseEntityModel>, EntityRepository<? extends BaseEntityModel, String>> reposMap = new HashMap<>();

    RepositoryFactory(
        EntityRepository<Drug, String> drugRepository,
        EntityRepository<Bill, String> billRepository,
        EntityRepository<Pharmacist, String> pharmacistRepository,
        EntityRepository<ExpiryNotification, String> expiryNotificationRepository
    ) {
        reposMap.put(Drug.class, drugRepository);
        reposMap.put(Bill.class, billRepository);
        reposMap.put(Pharmacist.class, pharmacistRepository);
        reposMap.put(ExpiryNotification.class, expiryNotificationRepository);
    }

    public <T extends BaseEntityModel, Key> EntityRepository<T, Key> getRepository(Class<?> entityClass) {
        return (EntityRepository<T, Key>) reposMap.get(entityClass);
    }

}
