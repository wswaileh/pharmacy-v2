package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.repositories.EntityRepository;
import com.swaileh.lanapharmacy.repositories.RepositoryFactory;
import com.swaileh.lanapharmacy.services.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class BaseEntityServiceImpl<T extends BaseEntityModel> implements BaseEntityService<T> {

    protected RepositoryFactory repositoryFactory;
    private Class<T> entityType;

    public BaseEntityServiceImpl(Class<T> entityType) {
        this.entityType = entityType;
        ServiceFactory.registerExtendedServiceType(entityType, (BaseEntityService<T>) this);
    }

    public RepositoryFactory getRepositoryFactory() {
        return repositoryFactory;
    }

    @Autowired
    public void setRepositoryFactory(RepositoryFactory repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    protected EntityRepository<T, String> getRepository() {
        return repositoryFactory.getRepository(entityType);
    }

    @Override
    public List<T> findAll() {
        return getRepository().findAll();
    }

    @Override
    public T findOne(String id) throws ResourceNotFoundException {
        return getRepository().findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(entityType.getName().toLowerCase() + " With Id " + id + " doesn't exist"));
    }

    @Override
    public T save(T entity) throws BadRequestException {
        return getRepository().save(entity);
    }

    @Override
    public List<T> save(Set<T> entities) {
        return getRepository().saveAll(entities);
    }

    @Override
    public void delete(String id) throws ResourceNotFoundException {
        getRepository().deleteById(id);
    }

    @Override
    public void delete(Set<String> ids) {
        if (!CollectionUtils.isEmpty(ids)) {
            Set<T> currentEntities = findAll().stream().filter(e -> ids.contains(e.getId())).collect(Collectors.toSet());
            getRepository().deleteAll(currentEntities);
        }
    }

}
