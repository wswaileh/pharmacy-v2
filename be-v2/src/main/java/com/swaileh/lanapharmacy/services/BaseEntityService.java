package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.BaseEntityModel;

import java.util.List;
import java.util.Set;

public interface BaseEntityService<T extends BaseEntityModel> {

    List<T> findAll();

    T findOne(String id);

    T save(T entity);

    List<T> save(Set<T> entities);

    void delete(String id);

    void delete(Set<String> ids);
}
