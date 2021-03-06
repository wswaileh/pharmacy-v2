package com.swaileh.lanapharmacy.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface EntityRepository<T, Key> extends MongoRepository<T, Key> {
}
