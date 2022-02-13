package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.Entities;
import com.swaileh.lanapharmacy.repositories.EntityRepository;
import com.swaileh.lanapharmacy.services.BaseEntityService;
import com.swaileh.lanapharmacy.web.rest.errors.ErrorConstants;
import com.swaileh.lanapharmacy.web.rest.errors.ResourceNotFoundException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class BaseEntityServiceImpl<T extends BaseEntityModel> extends BaseService implements BaseEntityService<T> {

    private Class<T> entityType;

    private String entityName;

    public BaseEntityServiceImpl(Class<T> entityType) {
        this.entityType = entityType;
        ServiceFactory.registerExtendedServiceType(entityType, this);
        this.entityName = Entities.getEntityByClass(entityType).getEntityName();
    }

    protected EntityRepository<T, String> getRepository() {
        return getRepositoryFactory().getRepository(entityType);
    }

    @Override
    public List<T> findAll() {
        return getRepository().findAll();
    }

    @Override
    public T findOne(String id) {
        return getRepository().findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(
                    entityName + " with ID " + id + " doesn't exist",
                    entityName,
                    ErrorConstants.ENTITY_NOT_FOUND_TYPE.toString()
                )
            );
    }

    @Override
    public T save(T entity) {
        return getRepository().save(entity);
    }

    @Override
    public List<T> save(Set<T> entities) {
        return getRepository().saveAll(entities);
    }

    @Override
    public void delete(String id) {
        this.delete(Collections.singleton(id));
    }

    @Override
    public void delete(Set<String> ids) {
        if (!CollectionUtils.isEmpty(ids)) {
            Set<T> currentEntities = findAll().stream().filter(e -> ids.contains(e.getId())).collect(Collectors.toSet());
            getRepository().deleteAll(currentEntities);
        }
    }

}
