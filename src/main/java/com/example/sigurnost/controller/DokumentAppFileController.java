package com.example.sigurnost.controller;

import com.example.sigurnost.model.DirektorijumEntity;
import com.example.sigurnost.model.FajlEntity;
import com.example.sigurnost.model.dto.Direktorijum;
import com.example.sigurnost.model.dto.Fajl;
import com.example.sigurnost.service.DirektorijumService;
import com.example.sigurnost.service.impl.FajlServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RequestMapping("/fajl")
@RestController
public class DokumentAppFileController {

    public static final String DIR="src"+File.separator+"main"+File.separator+"resources"+File.separator+"static";
    public static final String DIR1="target"+File.separator+"classes"+File.separator+"static";


    @Autowired
    private FajlServiceImpl fajlService;

    @Autowired
    DirektorijumService direktorijumService;

    @GetMapping("/sadrzaj/{id}")
    private String getFajlSadrzaj(@PathVariable Integer id){
        try{
            FajlEntity fajl = fajlService.findFajl(id);
            System.out.println("Text naziv: "+fajl.getNaziv());
            File resource = new ClassPathResource("static"+File.separator+fajl.getNaziv()+".txt").getFile();
            String text = new String(Files.readAllBytes(resource.toPath()));
            System.out.println("Text fajla: "+text);
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(text);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }

    @PutMapping("/izmjeni/{id}")
    private ResponseEntity<Boolean> updateFajlSadrzaj(@PathVariable Integer id, @RequestBody String text){
        try{
            System.out.println("id fajla: "+id);
            System.out.println("text : "+text);
            //FajlEntity fajl = fajlService.findById(id, FajlEntity.class);
            FajlEntity fajl = fajlService.findFajl(id);
            File resource = new ClassPathResource("static"+File.separator+fajl.getNaziv()+".txt").getFile();
            Files.writeString(resource.toPath(), text, StandardOpenOption.CREATE);
            return ResponseEntity.ok(true);
        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add")
    private String addFile(@RequestBody Fajl fajl){
        try{
            FajlEntity f = new FajlEntity();
            f.setNaziv(fajl.getNaziv());
            f.setLokacija(fajl.getLokacija());
            f.setObavjesten(false);
            f.setObrisan(false);
            FajlEntity newF = fajlService.insertFajl(f);
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(newF.getId());
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/newFileContent/{id}")
    private ResponseEntity<Boolean> addFileContent(@PathVariable int id, @RequestBody String text){
        try{
            FajlEntity fajl = fajlService.findFajl(id);
            String path = DIR +File.separator+fajl.getNaziv()+".txt";
            String path1 = DIR1 +File.separator+fajl.getNaziv()+".txt";
            Files.writeString(Paths.get(path), text, StandardOpenOption.CREATE);
            Files.writeString(Paths.get(path1), text, StandardOpenOption.CREATE);
            //File resource = new ClassPathResource("static"+File.separator+fajl.getNaziv()+".txt").getFile();
            //Files.writeString(resource.toPath(), text, StandardOpenOption.CREATE);
            return ResponseEntity.ok(true);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Boolean> deleteFile(@PathVariable Integer id){
        try{
            FajlEntity f=fajlService.findById(id, FajlEntity.class);
            f.setObavjesten(false);
            f.setObrisan(true);
            Date vrijeme = new Date();
            f.setObrisano_vrijeme(new Timestamp(vrijeme.getTime()));
            fajlService.update(id, f, FajlEntity.class);
            return ResponseEntity.ok(true);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/premjesti/{id}")
    private ResponseEntity<Boolean> moveFajl(@PathVariable Integer id, @RequestBody Fajl fajl){
        try{
            FajlEntity f=fajlService.findFajl(id);
            f.setLokacija(fajl.getLokacija());
            fajlService.update(id, f, FajlEntity.class);
            return ResponseEntity.ok(true);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }



}
