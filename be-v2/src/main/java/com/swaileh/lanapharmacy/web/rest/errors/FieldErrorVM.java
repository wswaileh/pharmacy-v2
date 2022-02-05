package com.swaileh.lanapharmacy.web.rest.errors;

import java.io.Serializable;

public class FieldErrorVM implements Serializable {

    private static final long serialVersionUID = 1L;

    private final String entity;

    private final String field;

    private final String errorCode;

    private final String message;

    public FieldErrorVM(String entity, String field, String errorCode, String message) {
        this.entity = entity;
        this.field = field;
        this.message = message;
        this.errorCode = errorCode;
    }

    public String getEntity() {
        return entity.replace("DTO", "");
    }

    public String getField() {
        return field;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }
}
