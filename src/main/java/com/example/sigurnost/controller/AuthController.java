package com.example.sigurnost.controller;


import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.dto.LoginResponse;
import com.example.sigurnost.model.enums.Role;
import com.example.sigurnost.model.requests.LoginGoogleRequest;
import com.example.sigurnost.model.requests.LoginRequest;
import com.example.sigurnost.service.AuthService;
import com.example.sigurnost.service.KorisnikService;
import com.example.sigurnost.service.impl.KorisnikServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
public class AuthController {

    //private final String token=System.getenv("sms.token");
    //private final String sid = System.getenv("sms.sid");

    @Value("${sms.token}")
    private String TOKEN;

    @Value("${sms.sid}")
    private String SID;


    private final AuthService service;
    private final KorisnikServiceImpl userService;



    public AuthController(AuthService service, KorisnikServiceImpl userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping("/sendSms/{id}")
    public String sendSms(@PathVariable int id){
        try {
            KorisnikEntity k=userService.findEntityById(id);
            String sendTo = k.getMobilni();
            System.out.println(TOKEN+" sid: "+SID);
            Twilio.init(SID, TOKEN);
            Random rand=new Random();
            int[] niz= rand.ints(8).toArray();
            String s = RandomStringUtils.randomAlphanumeric(8).toUpperCase();
            //String s = Arrays.toString(niz);
            Message message = Message.creator(
                    new com.twilio.type.PhoneNumber(sendTo),
                    new com.twilio.type.PhoneNumber("+12058139754"),
                   "Your verification code is: "+s)
                    .create();
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(s);
            //return null;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


    @PostMapping("logink")
    public LoginResponse loginKor(@RequestBody @Valid LoginRequest request) {
        LoginResponse r= service.login(request);
        if(r.getRole() == Role.ADMINS)
            return service.login(request);
        else return null;
    }

    @PostMapping("logind")
    public LoginResponse loginDok(@RequestBody @Valid LoginRequest request, HttpServletRequest hrequest) {
        System.out.println("Korisnik logind: "+request.getLozinka());
        LoginResponse r= service.login(request);
        KorisnikEntity k = userService.findEntityById(r.getId());
        String ogranicenaAdresa = k.getIpAdresa();
        String adresa = hrequest.getRemoteAddr();
        String dom = hrequest.getHeader("referer");
        if(ogranicenaAdresa != null){
            if(ogranicenaAdresa.equals(adresa)){
                return r;
            }else return null;
        }
        String domen = k.getDomen();
        if(domen != null){
            if(domen.equals(dom)){
                return r;
            }else return null;
        }
        if(k.getRole()!=Role.ADMINS && k.getObrisan()){
            return null;
        }
        return r;
    }

    @PostMapping("loginWithGoogle")
    public LoginResponse loginGoogle(@RequestBody @Valid LoginGoogleRequest request){
        try{
            System.out.println("Email: "+request.getMail());
            KorisnikEntity k = userService.getByEmail(request.getMail());
            System.out.println("Korisnik google login: "+k.getLozinka());
            LoginRequest l = new LoginRequest();
            l.setKorisnickoIme(k.getKorisnickoIme());
            l.setLozinka(k.getLozinka());
            return service.loginGoogle(k);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }

}
