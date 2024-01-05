package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.BaseEntityModel;

public interface UpdatableEntity<T extends BaseEntityModel> {
    T update(T entity);
}
