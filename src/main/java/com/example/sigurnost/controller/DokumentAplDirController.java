package com.example.sigurnost.controller;

import com.example.sigurnost.model.DirektorijumEntity;
import com.example.sigurnost.model.FajlEntity;
import com.example.sigurnost.model.dto.Direktorijum;
import com.example.sigurnost.model.dto.Fajl;
import com.example.sigurnost.service.impl.DirektorijumServiceImpl;
import com.example.sigurnost.service.impl.FajlServiceImpl;
import com.example.sigurnost.service.impl.KorisnikServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequestMapping("/dir")
@RestController
public class DokumentAplDirController {

    @Autowired
    private KorisnikServiceImpl userService;

    @Autowired
    private DirektorijumServiceImpl dirService;

    @Autowired
    private FajlServiceImpl fajlService;

    @GetMapping("/dirs/{id}")
    public String getDirectorijums(@PathVariable Integer id) throws JsonProcessingException {
        try {
            DirektorijumEntity dir = dirService.findDir(id);
            List<Direktorijum> svi = dirService.findAll(Direktorijum.class);
            List<Direktorijum> lista = new ArrayList<>();
            for (Direktorijum direktorijum : svi) {
                if ((direktorijum.getLokacija().contains(dir.getNaziv()) || direktorijum.getNaziv().equals(dir.getNaziv())) && !direktorijum.getObrisan()) {
                    lista.add(direktorijum);
                }
            }
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(lista);
        }catch (Exception e){
            return null;
        }
    }

    @GetMapping("/fajls/{id}")
    public String getFiles(@PathVariable Integer id) throws JsonProcessingException {
        try {
            //Direktorijum dir = dirService.findById(id, Direktorijum.class);
            DirektorijumEntity dir = dirService.findDir(id);
            List<Fajl> svi = fajlService.findAll(Fajl.class);
            System.out.println("fajlovi ");
            List<Fajl> lista = new ArrayList<>();
            for (Fajl f : svi) {
                if (f.getLokacija().contains(dir.getLokacija()) && !f.getObrisan()) {
                    lista.add(f);
                    System.out.println("dodat fajl: "+f.getNaziv());
                }
                System.out.println("fajl: "+f.getNaziv());
            }
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(lista);
        }catch (Exception e){
            return null;
        }
    }

    @GetMapping("/{id}")
    public String getDirectorijum(@PathVariable Integer id) throws JsonProcessingException {
        try {
            //Direktorijum dir = dirService.findById(id, Direktorijum.class);
            DirektorijumEntity dir = dirService.findDir(id);
            Direktorijum d = new Direktorijum();
            d.setId(dir.getId());
            d.setLokacija(dir.getLokacija());
            d.setNaziv(dir.getNaziv());
            d.setObavjesten(false);
            d.setObrisan(false);
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(d);
        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("/add")
    private ResponseEntity<Boolean> addDir( @RequestBody Direktorijum dir){
        try{
            DirektorijumEntity d = new DirektorijumEntity();
            d.setNaziv(dir.getNaziv());
            d.setLokacija(dir.getLokacija());
            d.setObrisan(dir.getObrisan());
            d.setObavjesten(dir.getObavjesten());
            d.setObrisano_vrijeme(null);
            dirService.insert(d, Direktorijum.class);
            return ResponseEntity.ok(true);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Boolean> deleteDir(@PathVariable Integer id){
        try{
            DirektorijumEntity d=dirService.findDir(id);
            d.setObavjesten(false);
            d.setObrisan(true);
            Date vrijeme = new Date();
            d.setObrisano_vrijeme(new Timestamp(vrijeme.getTime()));
            dirService.update(id, d, DirektorijumEntity.class);
            return ResponseEntity.ok(true);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

}
