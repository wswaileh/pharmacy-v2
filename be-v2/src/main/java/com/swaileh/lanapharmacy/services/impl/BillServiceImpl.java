package com.swaileh.lanapharmacy.services.impl;

import com.swaileh.lanapharmacy.models.bill.Bill;
import com.swaileh.lanapharmacy.services.BillService;
import org.springframework.stereotype.Service;

@Service
public class BillServiceImpl extends BaseEntityServiceImpl<Bill> implements BillService {

    public BillServiceImpl() {
        super(Bill.class);
    }
}
