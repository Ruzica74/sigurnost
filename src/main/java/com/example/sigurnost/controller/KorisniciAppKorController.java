package com.example.sigurnost.controller;


import com.example.sigurnost.model.DirektorijumEntity;
import com.example.sigurnost.model.FajlEntity;
import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.dto.Direktorijum;
import com.example.sigurnost.model.dto.Korisnik;
import com.example.sigurnost.model.enums.Role;
import com.example.sigurnost.model.requests.KorisnikAddRequest;
import com.example.sigurnost.model.requests.UserUpdateRequest;
import com.example.sigurnost.service.impl.DirektorijumServiceImpl;
import com.example.sigurnost.service.impl.KorisnikServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.apache.http.protocol.ResponseDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/korisnici")
@RestController
public class KorisniciAppKorController {

    @Autowired
    private KorisnikServiceImpl korisnikService;

    @Autowired
    private DirektorijumServiceImpl direktorijumService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/all")
    public String getAllUsers(){
        try {
            List<KorisnikEntity> korisnici= korisnikService.allUsers(Role.ADMINS);
            List<Korisnik> lista = new ArrayList<>();
            for(KorisnikEntity k: korisnici){
                if(!k.getObrisan()){
                    lista.add(korisnikService.findById(k.getId(), Korisnik.class));
                }
            }
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(lista);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/allDirs")
    public String getAllDirs(){
        try {
            List<Direktorijum> svi= direktorijumService.findAll(Direktorijum.class);
            List<Direktorijum> lista = new ArrayList<>();
            for (Direktorijum direktorijum : svi) {
                if (!direktorijum.getObrisan()){
                    lista.add(direktorijum);
                }
            }
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(lista);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<Boolean> addKlijent(@RequestBody KorisnikAddRequest k){
        try{
            KorisnikEntity kor = new KorisnikEntity();
            kor.setRole(k.getRole());
            kor.setIme(k.getIme());
            kor.setKorisnickoIme(k.getKorisnickoIme());
            kor.setLozinka(passwordEncoder.encode(k.getLozinka()));
            kor.setPrezime(k.getPrezime());
            kor.setCreate(k.getCreate());
            kor.setDelete(k.getDelete());
            kor.setRead(k.getRead());
            kor.setUpdate(k.getUpdate());
            DirektorijumEntity d = direktorijumService.findEntityById(k.getDirektorijum().getId());
            kor.setDirektorijum(d);
            kor.setDomen(k.getDomen());
            kor.setIpAdresa(k.getIpAdresa());
            kor.setMobilni(k.getMobilni());
            kor.setMail(k.getMail());
            if(kor.getDomen().equals(""))
                kor.setDomen(null);
            if(kor.getIpAdresa().equals(""))
                kor.setIpAdresa(null);
            kor.setObrisan(false);
            System.out.println(kor);
            korisnikService.saveKorisnika(kor);
            return ResponseEntity.ok(true);
        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getOne/{id}")
    public String getOne(@PathVariable int id){
        try{
            KorisnikEntity k = korisnikService.findEntityById(id);
            KorisnikAddRequest kor = new KorisnikAddRequest();
            kor.setRole(k.getRole());
            kor.setIme(k.getIme());
            kor.setKorisnickoIme(k.getKorisnickoIme());
            kor.setLozinka(passwordEncoder.encode(k.getLozinka()));
            kor.setPrezime(k.getPrezime());
            kor.setCreate(k.getCreate());
            kor.setDelete(k.getDelete());
            kor.setRead(k.getRead());
            kor.setUpdate(k.getUpdate());
            Direktorijum d = direktorijumService.findById(k.getDirektorijum().getId(), Direktorijum.class);
            kor.setDirektorijum(d);
            kor.setDomen(k.getDomen());
            kor.setIpAdresa(k.getIpAdresa());
            kor.setMobilni(k.getMobilni());
            kor.setMail(k.getMail());
            System.out.println(kor);
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(kor);
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @PostMapping("/addAdmin")
    public ResponseEntity<Boolean> addAdminD(@RequestBody KorisnikAddRequest k){
        try{
            KorisnikEntity kor = new KorisnikEntity();
            kor.setRole(k.getRole());
            kor.setIme(k.getIme());
            kor.setKorisnickoIme(k.getKorisnickoIme());
            kor.setLozinka(passwordEncoder.encode(k.getLozinka()));
            kor.setPrezime(k.getPrezime());
            kor.setCreate(true);
            kor.setDelete(true);
            kor.setRead(k.getRead());
            kor.setUpdate(true);
            DirektorijumEntity d = direktorijumService.findEntityById(k.getDirektorijum().getId());
            kor.setDirektorijum(d);
            kor.setMobilni(k.getMobilni());
            kor.setMail(k.getMail());
            if("".equals(k.getDomen()))
                kor.setDomen(null);
            if("".equals(k.getIpAdresa()))
                kor.setIpAdresa(null);
            kor.setObrisan(false);
            korisnikService.saveKorisnika(kor);
            return ResponseEntity.ok(true);
        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/updateAdmin")
    public ResponseEntity<Boolean> updateAdminD(@RequestBody KorisnikAddRequest k){
        try{
            KorisnikEntity kor = new KorisnikEntity();
            kor.setRole(k.getRole());
            kor.setIme(k.getIme());
            kor.setId(k.getId());
            kor.setKorisnickoIme(k.getKorisnickoIme());
            if(k.getLozinka()!=null) {
                kor.setLozinka(passwordEncoder.encode(k.getLozinka()));
            }
            kor.setPrezime(k.getPrezime());
            kor.setCreate(true);
            kor.setDelete(true);
            kor.setRead(true);
            kor.setUpdate(true);
            DirektorijumEntity d = direktorijumService.findEntityById(k.getDirektorijum().getId());
            kor.setDirektorijum(d);
            kor.setMobilni(k.getMobilni());
            kor.setMail(k.getMail());
            korisnikService.update(k.getId(), kor, KorisnikEntity.class);
            return ResponseEntity.ok(true);
        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/updateUser")
    public ResponseEntity<Boolean> updateKlijent(@RequestBody KorisnikAddRequest k){
        try{
            KorisnikEntity kor = new KorisnikEntity();
            kor.setRole(k.getRole());
            kor.setId(k.getId());
            kor.setIme(k.getIme());
            kor.setKorisnickoIme(k.getKorisnickoIme());
            if(k.getLozinka()!=null) {
                kor.setLozinka(passwordEncoder.encode(k.getLozinka()));
            }
            kor.setPrezime(k.getPrezime());
            kor.setCreate(k.getCreate());
            kor.setDelete(k.getDelete());
            kor.setRead(k.getRead());
            kor.setUpdate(k.getUpdate());
            DirektorijumEntity d = direktorijumService.findEntityById(k.getDirektorijum().getId());
            kor.setDirektorijum(d);
            kor.setDomen(k.getDomen());
            kor.setIpAdresa(k.getIpAdresa());
            kor.setMobilni(k.getMobilni());
            kor.setMail(k.getMail());
            korisnikService.update(k.getId(), kor, KorisnikEntity.class);
            return ResponseEntity.ok(true);
        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteKorisnik(@PathVariable int id) {
        try {
            KorisnikEntity k=korisnikService.findEntityById(id);
            k.setObrisan(true);
            korisnikService.update(id, k, KorisnikEntity.class);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
