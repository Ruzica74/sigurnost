package com.example.sigurnost.service;

import com.example.sigurnost.base.CrudService;
import com.example.sigurnost.model.FajlEntity;

public interface FajlService extends CrudService<Integer> {
    FajlEntity insertFajl(FajlEntity f);
}
