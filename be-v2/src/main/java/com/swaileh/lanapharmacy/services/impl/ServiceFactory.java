package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.services.BaseEntityService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class ServiceFactory {

    private static final Set<Class<? extends BaseEntityModel>> ENTITIES = new HashSet<>();
    private static final Map<Class<? extends BaseEntityModel>, BaseEntityService<? extends BaseEntityModel>> SERVICE_MAP = new HashMap<>();
    private static final Map<Class<? extends BaseEntityModel>, BaseEntityService<? extends BaseEntityModel>> EXTENDED_SERVICES = new HashMap<>();
    private static ObjectProvider<BaseEntityService<BaseEntityModel>> baseServiceProvider;

    @Autowired
    private ServiceFactory(ObjectProvider<BaseEntityService<BaseEntityModel>> baseServiceProvider) {
        ServiceFactory.baseServiceProvider = baseServiceProvider;

        // Fulfill Overridden entity services
        ServiceFactory.SERVICE_MAP.putAll(ServiceFactory.EXTENDED_SERVICES);

        // Fulfill rest of services
        ServiceFactory.ENTITIES.removeAll(ServiceFactory.EXTENDED_SERVICES.keySet());
        ServiceFactory.ENTITIES.forEach(entity -> registerService(entity));
    }


    public static <T extends BaseEntityModel> void registerEntityType(T entityType) {
        if (!ServiceFactory.ENTITIES.contains(entityType.getClass())) {
            ENTITIES.add(entityType.getClass());
        }
    }

    public static <T extends BaseEntityModel> void registerExtendedServiceType(Class<? extends BaseEntityModel> entityType,
                                                                               BaseEntityService<T> entityService) {
        if (!ServiceFactory.EXTENDED_SERVICES.keySet().contains(entityType.getClass())) {
            EXTENDED_SERVICES.put(entityType, entityService);
        }
    }

    private static <T extends BaseEntityModel> void registerService(Class<T> entityType) {
        ServiceFactory.SERVICE_MAP.put(entityType, baseServiceProvider.getObject(entityType));
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseEntityModel> BaseEntityService<T> getService(Class<T> entityClass) {
        if (SERVICE_MAP.isEmpty()) {
            ENTITIES.forEach(entity -> registerService(entity));
        }
        return (BaseEntityService<T>) ServiceFactory.SERVICE_MAP.get(entityClass);
    }
}
