package com.swaileh.lanapharmacy.controllers;

import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.models.exceptions.BadRequestException;
import com.swaileh.lanapharmacy.models.exceptions.ResourceNotFoundException;
import com.swaileh.lanapharmacy.services.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequestMapping("/api/bills")
@RestController
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping
    public List<Bill> getAllBills() {
        return billService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable(value = "id") String id) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(billService.findOne(id));
    }

    @PostMapping
    public Bill saveBill(@RequestBody Bill bill) throws BadRequestException {
        return billService.save(bill);
    }
}
