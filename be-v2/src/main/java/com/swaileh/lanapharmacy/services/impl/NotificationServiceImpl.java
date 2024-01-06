package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.Entities;
import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;
import com.swaileh.lanapharmacy.repositories.notification.NotificationRepository;
import com.swaileh.lanapharmacy.services.NotificationService;
import com.swaileh.lanapharmacy.web.rest.errors.BadRequestAlertException;
import com.swaileh.lanapharmacy.web.rest.errors.ErrorConstants;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class NotificationServiceImpl extends BaseEntityServiceImpl<ExpiryNotification> implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        super(ExpiryNotification.class);
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<ExpiryNotification> findAll() {
        return notificationRepository.findAll().stream()
            .filter(expiryNotification -> {
                Date currentDate = new Date();
                LocalDate currentLocalDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                LocalDate reminderLocalDate = expiryNotification.getReminderDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                return reminderLocalDate.getMonthValue() >= currentLocalDate.getMonthValue() && reminderLocalDate.getYear() >= currentLocalDate.getYear();
            })
            .sorted()
            .collect(Collectors.toList());
    }

    @Override
    public ExpiryNotification save(ExpiryNotification expiryNotification) {
        if (isNotValidNotification(expiryNotification)) {
            throw new BadRequestAlertException("Notification Date Can't be before today!",
                Entities.NOTIFICATION.getEntityName(), ErrorConstants.ERR_VALIDATION);
        }
        return notificationRepository.save(expiryNotification);
    }

    @Override
    public ExpiryNotification update(ExpiryNotification expiryNotification) {
        if (isNotValidNotification(expiryNotification)) {
            throw new BadRequestAlertException("Notification Date Can't be before today!",
                Entities.NOTIFICATION.getEntityName(), ErrorConstants.ERR_VALIDATION);
        }
        expiryNotification.setReminderDate(expiryNotification.getReminderDate());
        return notificationRepository.save(expiryNotification);
    }

    private boolean isNotValidNotification(ExpiryNotification expiryNotification) {
        LocalDate currentLocalDate = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        LocalDate reminderLocalDate = expiryNotification.getReminderDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        return reminderLocalDate.getMonthValue() < currentLocalDate.getMonthValue() && reminderLocalDate.getYear() < currentLocalDate.getYear();
    }
}
