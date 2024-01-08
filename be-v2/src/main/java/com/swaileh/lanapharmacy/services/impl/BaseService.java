package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.repositories.RepositoryFactory;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

@Getter
@Service
public class BaseService {

    private RepositoryFactory repositoryFactory;
    private MessageSource messageSource;

    @Autowired
    public void setRepositoryFactory(RepositoryFactory repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    @Autowired
    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

}
