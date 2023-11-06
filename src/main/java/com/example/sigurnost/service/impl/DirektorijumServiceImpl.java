package com.example.sigurnost.service.impl;

import com.example.sigurnost.base.CrudJpaService;
import com.example.sigurnost.model.DirektorijumEntity;
import com.example.sigurnost.repository.DirektorijumRepository;
import com.example.sigurnost.service.DirektorijumService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
public class DirektorijumServiceImpl extends CrudJpaService<DirektorijumEntity, Integer> implements DirektorijumService {


    private final DirektorijumRepository repository;

    public DirektorijumServiceImpl(DirektorijumRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, DirektorijumEntity.class);
        this.repository = repository;
    }

    public DirektorijumEntity findDir(int id){
        return repository.findDirektorijumEntityById(id);
    }


}
