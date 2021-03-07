package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;
import com.swaileh.lanapharmacy.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/notifications")
@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<ExpiryNotification> getNotifications() {
        return notificationService.findAll();
    }

    @PostMapping
    public ExpiryNotification saveNotification(@RequestBody ExpiryNotification expiryNotification) throws BadRequestException { return notificationService.save(expiryNotification); }

    @PutMapping("/{id}")
    public ExpiryNotification editNotification(@PathVariable(value = "id") String id, @RequestBody ExpiryNotification newExpiryNotification)
        throws ResourceNotFoundException, BadRequestException {

        return notificationService.update(newExpiryNotification);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable(value = "id") String id) throws ResourceNotFoundException {
        notificationService.delete(id);
    }
}
