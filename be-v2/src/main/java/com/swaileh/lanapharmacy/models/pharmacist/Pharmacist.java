package com.swaileh.lanapharmacy.models.pharmacist;

import com.swaileh.lanapharmacy.models.BaseEntityModel;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.Objects;

@Document(collection = "pharmacists")
public class Pharmacist extends BaseEntityModel {

    @NotNull
    private Long pid;

    @NotNull
    private String name;

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Pharmacist that = (Pharmacist) o;

        if (!Objects.equals(id, that.id)) return false;
        if (!Objects.equals(pid, that.pid)) return false;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (pid != null ? pid.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Pharmacist{" +
            "id=" + id +
            ", pid=" + pid +
            ", name='" + name + '\'' +
            '}';
    }
}
