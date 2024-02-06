package com.example.iot_be.service;

import com.example.iot_be.enity.Action;
import com.example.iot_be.repository.ActionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ActionServiceImpl implements Command<Action> {
    @Autowired
    ActionRepo actionRepo;
    @Override
    public List<Action> getAll() {
        return actionRepo.findAll();
    }

    @Override
    public void save(Action action) {
        actionRepo.save(action);
    }

}
