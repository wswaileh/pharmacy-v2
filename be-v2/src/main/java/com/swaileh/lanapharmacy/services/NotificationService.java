package com.swaileh.lanapharmacy.services;

import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;

public interface NotificationService extends BaseEntityService<ExpiryNotification>{
    public ExpiryNotification update(ExpiryNotification entity) throws ResourceNotFoundException, BadRequestException;
}
