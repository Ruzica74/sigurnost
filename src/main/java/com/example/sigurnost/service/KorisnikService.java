package com.example.sigurnost.service;

import com.example.sigurnost.base.CrudService;
import com.example.sigurnost.model.KorisnikEntity;
import com.example.sigurnost.model.dto.Korisnik;
import com.example.sigurnost.model.enums.Role;
import com.example.sigurnost.model.requests.ChangeRoleRequest;
import com.example.sigurnost.model.requests.ChangeStatusRequest;
import com.example.sigurnost.model.requests.UserUpdateRequest;

import java.util.List;

public interface KorisnikService extends CrudService<Integer> {

    void changeStatus(Integer userId, ChangeStatusRequest request);

    void changeRole(Integer userId, ChangeRoleRequest request);


    void saveKorisnika(KorisnikEntity k);

    List<KorisnikEntity> allUsers(Role x);
}
