package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.repositories.RepositoryFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

@Service
public class BaseService {

    protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private RepositoryFactory repositoryFactory;
    private MessageSource messageSource;

    public RepositoryFactory getRepositoryFactory() {
        return repositoryFactory;
    }

    @Autowired
    public void setRepositoryFactory(RepositoryFactory repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    public MessageSource getMessageSource() {
        return messageSource;
    }

    @Autowired
    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

}
