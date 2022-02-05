package com.swaileh.lanapharmacy.models;

import org.springframework.data.annotation.Id;

import java.util.Objects;

public class BaseEntityModel {

    @Id
    protected String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BaseEntityModel that = (BaseEntityModel) o;

        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "BaseEntityModel{" +
            "id='" + id + '\'' +
            '}';
    }
}
