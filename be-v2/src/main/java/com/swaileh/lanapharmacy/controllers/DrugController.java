package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.services.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequestMapping("/drugs")
@RestController
public class DrugController {

    @Autowired
    private DrugService drugService;

    @GetMapping
    public List<Drug> getDrugs() {
        return drugService.findAll();
    }

    @GetMapping("/{barcode}")
    public Drug getDrug(@PathVariable(value = "barcode") Long barcode) throws ResourceNotFoundException {
        return drugService.findByBarcode(barcode);
    }

    @PostMapping
    public Drug saveDrug(@RequestBody Drug drug) throws ResourceNotFoundException, BadRequestException {
        return drugService.save(drug);
    }

    @PutMapping("/{barcode}")
    public Drug editDrug(@PathVariable(value = "barcode") Long barcode, @RequestBody Drug newDrug)
        throws ResourceNotFoundException, BadRequestException {

        return drugService.update(newDrug);
    }

    @DeleteMapping("/{barcode}")
    public void deleteDrug(@PathVariable(value = "barcode") Long barcode) throws ResourceNotFoundException {
        drugService.deleteByBarcode(barcode);
    }
}
