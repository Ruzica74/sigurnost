package com.example.sigurnost.service.impl;

import com.example.sigurnost.base.CrudJpaService;
import com.example.sigurnost.exception.ConflictException;
import com.example.sigurnost.exception.ForbiddenException;
import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.dto.Korisnik;
import com.example.sigurnost.model.enums.Role;
import com.example.sigurnost.model.enums.Status;
import com.example.sigurnost.model.requests.ChangeRoleRequest;
import com.example.sigurnost.model.requests.ChangeStatusRequest;
import com.example.sigurnost.model.requests.UserUpdateRequest;
import com.example.sigurnost.repository.KorisnikRepository;
import com.example.sigurnost.service.KorisnikService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.jms.core.JmsTemplate;

import java.util.List;

@Service
public class KorisnikServiceImpl extends CrudJpaService<KorisnikEntity, Integer> implements KorisnikService {

    private final PasswordEncoder passwordEncoder;
    private KorisnikRepository repository;



    public KorisnikServiceImpl(KorisnikRepository repository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        super(repository, modelMapper, KorisnikEntity.class);
        this.passwordEncoder = passwordEncoder;
        this.repository=repository;

    }

    /*public Korisnik update(Integer id, UserUpdateRequest user) {
        if (repository.existsByKorisnickoImeAndIdNot(user.getKorisnickoIme(), id))
            throw new ConflictException();
            //System.out.println("exception update Korisnik");
        KorisnikEntity entity = findEntityById(id);
        entity.setKorisnickoIme(user.getKorisnickoIme());
        entity.setIme(user.getIme());
        entity.setPrezime(user.getPrezime());
        entity.setMail(user.getMail());
        return update(id, entity, Korisnik.class);
    }

     */

    @Override
    public void changeStatus(Integer userId, ChangeStatusRequest request) {
        if (Status.DELETED.equals(request.getStatus()))
            throw new ForbiddenException();
            //System.out.println("exception changeStatus");
        KorisnikEntity entity = findEntityById(userId);
        //entity.setStatus(getModelMapper().map(request.getStatus(), Status.class));
        repository.saveAndFlush(entity);
    }

    @Override
    public void changeRole(Integer userId, ChangeRoleRequest request) {
        KorisnikEntity entity = findEntityById(userId);
        entity.setRole(request.getRole());
        repository.saveAndFlush(entity);
    }

    public KorisnikEntity getByEmail(String mail){
        return repository.findByMail(mail);
    }


    public void saveKorisnika(KorisnikEntity k){
        repository.save(k);
    }

    public List<KorisnikEntity> allUsers(Role x){
        return repository.findAllByRoleNot(x);
    }


}
