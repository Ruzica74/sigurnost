package com.example.sigurnost.service;

import com.example.sigurnost.base.CrudService;
import com.example.sigurnost.model.DirektorijumEntity;
import com.example.sigurnost.model.dto.Direktorijum;

import java.util.List;

public interface DirektorijumService extends CrudService<Integer> {
    DirektorijumEntity findDir(int id);

}
