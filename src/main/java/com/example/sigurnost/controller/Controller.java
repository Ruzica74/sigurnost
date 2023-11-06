package com.example.sigurnost.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RequestMapping("/test")
@RestController
public class Controller {

    @GetMapping
    public String getTest(){
        return "Heloooo";
    }
}
