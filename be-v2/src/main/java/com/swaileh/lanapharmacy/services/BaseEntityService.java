package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Set;

public interface BaseEntityService<T extends BaseEntityModel> {

    public List<T> findAll();

    public T findOne(String id) throws ResourceNotFoundException;

    public T save(T entity) throws BadRequestException;

    public List<T> save(Set<T> entities);

    public void delete(String id) throws ResourceNotFoundException;

    public void delete(Set<String> ids);
}
