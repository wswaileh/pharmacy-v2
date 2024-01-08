package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.configuration.PathConstants;
import com.swaileh.lanapharmacy.models.notification.ExpiryNotification;
import com.swaileh.lanapharmacy.services.NotificationService;
import com.swaileh.lanapharmacy.web.rest.errors.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(PathConstants.Notification.RESOURCE_BASE_V0)
@AllArgsConstructor
public class NotificationController extends BaseController {

    private NotificationService notificationService;

    @GetMapping
    public List<ExpiryNotification> getNotifications() {
        return notificationService.findAll();
    }

    @PostMapping
    public ExpiryNotification saveNotification(@RequestBody ExpiryNotification expiryNotification) {
        return notificationService.save(expiryNotification);
    }

    @PutMapping(PathConstants.BY_ID)
    public ExpiryNotification editNotification(@PathVariable(value = "id") String id, @RequestBody ExpiryNotification newExpiryNotification) {
        return notificationService.update(newExpiryNotification);
    }

    @DeleteMapping(PathConstants.BY_ID)
    public void deleteNotification(@PathVariable(value = "id") String id) throws ResourceNotFoundException {
        notificationService.delete(id);
    }
}
