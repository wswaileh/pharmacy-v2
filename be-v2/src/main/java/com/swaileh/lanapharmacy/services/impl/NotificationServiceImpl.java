package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;
import com.swaileh.lanapharmacy.repositories.notification.NotificationRepository;
import com.swaileh.lanapharmacy.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class NotificationServiceImpl extends BaseEntityServiceImpl<ExpiryNotification> implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    private final ServiceFactory serviceFactory;

    public NotificationServiceImpl(ServiceFactory serviceFactory) {
        super(ExpiryNotification.class);
        this.serviceFactory = serviceFactory;
    }

    @Override
    public List<ExpiryNotification> findAll() {
        return notificationRepository.findAll().stream().sorted().collect(Collectors.toList());
    }

    @Override
    public ExpiryNotification save(ExpiryNotification expiryNotification) throws BadRequestException {
        Date currentDate = new Date();
        LocalDate currentLocalDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        LocalDate reminderLocalDate = expiryNotification.getReminderDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        if (reminderLocalDate.getMonthValue() >= currentLocalDate.getMonthValue() && reminderLocalDate.getYear() >= currentLocalDate.getYear()) {
            return notificationRepository.save(expiryNotification);
        } else {
            throw new BadRequestException("Notification Date Can't be before today!");
        }
    }

}
