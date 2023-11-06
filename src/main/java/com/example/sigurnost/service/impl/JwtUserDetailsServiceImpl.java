package com.example.sigurnost.service.impl;

import com.example.sigurnost.base.CrudJpaService;
import com.example.sigurnost.model.FajlEntity;
import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.dto.JwtUser;
import com.example.sigurnost.model.dto.Korisnik;
import com.example.sigurnost.model.enums.Role;
import com.example.sigurnost.model.enums.Status;
import com.example.sigurnost.repository.KorisnikRepository;
import com.example.sigurnost.service.JwtUserDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtUserDetailsServiceImpl  implements JwtUserDetailsService {

    private final KorisnikRepository repository;
    private final ModelMapper modelMapper;

    public JwtUserDetailsServiceImpl(KorisnikRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public JwtUser loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("jwt user detail  " +username);
        //ptional<KorisnikEntity> k=repository.findByKorisnickoImeAndStatus(username, Status.ACTIVE);
        //System.out.println("get optional "+k.get());
        JwtUser jw=modelMapper.map(repository.findByKorisnickoImeAndStatus(username, Status.ACTIVE).
                orElseThrow(() -> new UsernameNotFoundException(username)), JwtUser.class);
        System.out.println(jw.getKorisnickoIme()+" jwtu  "+jw.getLozinka());
        //JwtUser jw=new JwtUser(1, "admin", "$2a$12$NvCrYDsH8DPfC2j0MmL/a.pAyMlzZkddzN7HIRUN.CxElqhlVEKJi", Role.ADMINS);
        return jw;
    }
}
