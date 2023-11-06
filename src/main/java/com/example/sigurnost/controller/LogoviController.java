package com.example.sigurnost.controller;


import com.example.sigurnost.model.FajlEntity;
import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.LogoviEntity;
import com.example.sigurnost.model.dto.Logovi;
import com.example.sigurnost.service.impl.KorisnikServiceImpl;
import com.example.sigurnost.service.impl.LogoviServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequestMapping("/log")
@RestController
public class LogoviController {

    @Autowired
    private LogoviServiceImpl logoviService;

    @Autowired
    private KorisnikServiceImpl korisnikService;

    @PostMapping("/add")
    private ResponseEntity<Boolean> addActivity(@RequestBody Logovi log){
        try{
            LogoviEntity l = new LogoviEntity();
            l.setAkcija(log.getAkcija());
            KorisnikEntity k = korisnikService.findEntityById(log.getKorisnik().getId());
            l.setKorisnik(k);
            l.setObjekat(log.getObjekat());
            l.setPregledan(false);
            Date vrijeme = new Date();
            l.setVrijeme(new Timestamp(vrijeme.getTime()));
            logoviService.insertLog(l);
            return ResponseEntity.ok(true);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all")
    private String getAllLogs(){
        try{
            List<Logovi> svi = logoviService.findAll(Logovi.class);
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(svi);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/notifikacije")
    public String getNotifikacije(){
        try{
            List<Logovi> svi = logoviService.findAll(Logovi.class);
            List<Logovi> notif = new ArrayList<>();
            for(Logovi l: svi){
                if(!l.getPregledan() && l.getAkcija().equals("obrisan")){
                    notif.add(l);
                }
            }
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(notif);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Boolean> update(@PathVariable int id, @RequestBody Logovi logovi){
        try{
            LogoviEntity l = logoviService.findEntityById(id);
            l.setPregledan(true);
            LogoviEntity log = logoviService.update(id, l, LogoviEntity.class);
            System.out.println("upadeted log: "+log.getPregledan());
            return ResponseEntity.ok(true);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

}
