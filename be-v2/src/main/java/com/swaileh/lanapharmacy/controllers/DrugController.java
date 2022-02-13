package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.configuration.PathConstants;
import com.swaileh.lanapharmacy.models.drug.Drug;
import com.swaileh.lanapharmacy.services.DrugService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(PathConstants.Drug.RESOURCE_BASE_V0)
public class DrugController extends BaseController {

    private DrugService drugService;

    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }

    @GetMapping
    public List<Drug> getDrugs() {
        return drugService.findAll();
    }

    @GetMapping(PathConstants.Drug.BY_BARCODE)
    public Drug getDrug(@PathVariable(value = "barcode") Long barcode) {
        return drugService.findByBarcode(barcode);
    }

    @PostMapping
    public Drug saveDrug(@RequestBody Drug drug) {
        return drugService.save(drug);
    }

    @PutMapping(PathConstants.BY_ID)
    public Drug editDrug(@RequestBody Drug newDrug) {
        return drugService.update(newDrug);
    }

    @DeleteMapping(PathConstants.Drug.BY_BARCODE)
    public void deleteDrug(@PathVariable(value = "barcode") Long barcode) {
        drugService.deleteByBarcode(barcode);
    }
}
