package com.example.sigurnost.service;

import com.example.sigurnost.base.CrudService;
import com.example.sigurnost.model.LogoviEntity;

public interface LogoviService extends CrudService<Integer> {
    void insertLog(LogoviEntity e);
}
