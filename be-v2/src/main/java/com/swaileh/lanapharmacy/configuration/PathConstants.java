package com.swaileh.lanapharmacy.configuration;

public interface PathConstants {

    String BASE = "/api";
    String VERSION_0 = "/v0";
    String VERSION_1 = "/v1";

    String BY_ID = "/{id}";

    interface Bill {
        String RESOURCE = "/bills";
        String RESOURCE_BASE_V0 = BASE + VERSION_0 + RESOURCE;
    }

    interface Drug {
        String RESOURCE = "/drugs";
        String RESOURCE_BASE_V0 = BASE + VERSION_0 + RESOURCE;
        String BY_BARCODE = "/{barcode}";
    }

    interface Notification {
        String RESOURCE = "/notifications";
        String RESOURCE_BASE_V0 = BASE + VERSION_0 + RESOURCE;
    }

    interface Pharmacist {
        String RESOURCE = "/pharmacists";
        String RESOURCE_BASE_V0 = BASE + VERSION_0 + RESOURCE;
    }


}
