package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.configuration.PathConstants;
import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.services.BillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(PathConstants.Bill.RESOURCE_BASE_V0)
@RestController
public class BillController extends BaseController {

    private BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billService.findAll();
    }

    @GetMapping(PathConstants.BY_ID)
    public ResponseEntity<Bill> getBillById(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(billService.findOne(id));
    }

    @PostMapping
    public Bill saveBill(@RequestBody Bill bill) {
        return billService.save(bill);
    }
}
