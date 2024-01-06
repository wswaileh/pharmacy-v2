package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.configuration.PathConstants;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.services.PharmacistService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(PathConstants.Pharmacist.RESOURCE_BASE_V0)
@AllArgsConstructor
public class PharmacistController extends BaseController {

    private PharmacistService pharmacistService;

    @GetMapping
    @PreAuthorize("hasAuthority('Admin') || hasAuthority('Manager')")
    public List<Pharmacist> getPharmacists() {
        return pharmacistService.findAll();
    }

    @PutMapping(PathConstants.BY_ID)
    @PreAuthorize("hasAuthority('Admin') || hasAuthority('Manager')")
    public Pharmacist editPharmacist(@PathVariable(value = "id") String id, @RequestBody Pharmacist newPharmacist) {
        return pharmacistService.update(newPharmacist);
    }

}
