package com.swaileh.lanapharmacy.repositories.notification;

import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;
import com.swaileh.lanapharmacy.repositories.EntityRepository;

public interface NotificationRepository extends EntityRepository<ExpiryNotification, String> {
}
