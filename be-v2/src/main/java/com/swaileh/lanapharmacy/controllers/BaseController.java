package com.swaileh.lanapharmacy.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class BaseController {

    @GetMapping
    public String hey() {
        return "Hello World!";
    }
}
