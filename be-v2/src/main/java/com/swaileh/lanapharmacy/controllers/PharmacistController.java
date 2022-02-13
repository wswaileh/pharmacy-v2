package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.configuration.PathConstants;
import com.swaileh.lanapharmacy.models.pharmacist.Pharmacist;
import com.swaileh.lanapharmacy.services.PharmacistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(PathConstants.Pharmacist.RESOURCE_BASE_V0)
public class PharmacistController extends BaseController {

    private PharmacistService pharmacistService;

    public PharmacistController(PharmacistService pharmacistService) {
        this.pharmacistService = pharmacistService;
    }

    @GetMapping
    public List<Pharmacist> getPharmacists() {
        return pharmacistService.findAll();
    }

    @PutMapping(PathConstants.BY_ID)
    public Pharmacist editPharmacist(@RequestBody Pharmacist newPharmacist) {
        return pharmacistService.update(newPharmacist);
    }

}
