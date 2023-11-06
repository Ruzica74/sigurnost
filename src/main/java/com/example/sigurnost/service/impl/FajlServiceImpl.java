package com.example.sigurnost.service.impl;

import com.example.sigurnost.base.CrudJpaService;
import com.example.sigurnost.model.FajlEntity;
import com.example.sigurnost.repository.FajlRepository;
import com.example.sigurnost.service.FajlService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class FajlServiceImpl extends CrudJpaService<FajlEntity, Integer> implements FajlService {

    private FajlRepository repository;


    public FajlServiceImpl(FajlRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, FajlEntity.class);
        this.repository=repository;
    }

    public FajlEntity insertFajl(FajlEntity f){
        FajlEntity fajl = repository.save(f);
        return fajl;
    }

    public FajlEntity findFajl(int id){
        return  repository.findFajlEntityById(id);
    }
}
