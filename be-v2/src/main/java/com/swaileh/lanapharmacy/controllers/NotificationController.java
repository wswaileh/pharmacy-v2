package com.swaileh.lanapharmacy.controllers;

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

    @DeleteMapping
    public void deleteNotification(@PathVariable(value = "id") String id) throws ResourceNotFoundException {
        notificationService.delete(id);
    }
}
