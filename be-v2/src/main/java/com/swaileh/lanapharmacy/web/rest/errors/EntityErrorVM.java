package com.swaileh.lanapharmacy.web.rest.errors;

import java.io.Serializable;

public class EntityErrorVM implements Serializable {

    private static final long serialVersionUID = 1L;

    private final String entity;

    private final String errorCode;

    private final String message;

    /**
     * @param entity
     * @param errorCode
     * @param message
     */
    public EntityErrorVM(String entity, String errorCode, String message) {
        this.entity = entity;
        this.message = message;
        this.errorCode = errorCode;
    }

    public String getEntity() {
        return entity.replace("DTO", "");
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

}
