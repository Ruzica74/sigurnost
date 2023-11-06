package com.example.sigurnost.service.impl;

import com.example.sigurnost.exception.UnauthorizedException;
import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.dto.JwtUser;
import com.example.sigurnost.model.dto.LoginResponse;
import com.example.sigurnost.model.requests.LoginRequest;
import com.example.sigurnost.service.AuthService;
import com.example.sigurnost.service.KorisnikService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final KorisnikService userService;
    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;


    public AuthServiceImpl(AuthenticationManager authenticationManager, KorisnikService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        LoginResponse response = null;
        System.out.println(request.getKorisnickoIme()+ "  "+request.getLozinka());
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getKorisnickoIme(), request.getLozinka()
                            )
                    );
            JwtUser user = (JwtUser) authenticate.getPrincipal();
            response = userService.findById(user.getId(), LoginResponse.class);
            response.setToken(generateJwt(user));
        } catch (Exception ex) {
            //LoggingUtil.logException(ex, getClass());
            ex.printStackTrace();
            throw new UnauthorizedException();
        }
        return response;
    }

    public LoginResponse loginGoogle(KorisnikEntity k){
        LoginResponse response = null;
        try {
            response = userService.findById(k.getId(), LoginResponse.class);
            JwtUser jwt = new JwtUser();
            jwt.setId(k.getId());
            jwt.setLozinka(k.getLozinka());
            jwt.setRole(k.getRole());
            jwt.setKorisnickoIme(k.getKorisnickoIme());
            response.setToken(generateJwt(jwt));
        }catch (Exception e){
            e.printStackTrace();
        }
        return response;
    }


    private String generateJwt(JwtUser user) {
        return Jwts.builder()
                .setId(user.getId().toString())
                .setSubject(user.getUsername())
                .claim("role", user.getRole().name())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }
}
