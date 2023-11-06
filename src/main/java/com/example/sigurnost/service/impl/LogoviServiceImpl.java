package com.example.sigurnost.service.impl;

import com.example.sigurnost.base.CrudJpaService;
import com.example.sigurnost.model.LogoviEntity;
import com.example.sigurnost.repository.LogoviRepository;
import com.example.sigurnost.service.LogoviService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class LogoviServiceImpl extends CrudJpaService<LogoviEntity, Integer> implements LogoviService {

    private LogoviRepository repository;

    public LogoviServiceImpl(LogoviRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, LogoviEntity.class);
        this.repository=repository;
    }

    public void insertLog(LogoviEntity l){
        repository.save(l);
    }
}
