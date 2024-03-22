package com.example.iot_be.service;

import com.example.iot_be.config.LocalDateTimeAdapter;
import com.example.iot_be.enity.Action;
import com.example.iot_be.exception.InvalidDateRangeException;
import com.example.iot_be.exception.NoDataException;
import com.example.iot_be.mqtt.MqttService;
import com.example.iot_be.repository.ActionRepo;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActionServiceImpl implements  ActionService {
    @Autowired
    ActionRepo actionRepo;
    @Autowired
    MqttService mqttService;
    Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
            .create();
    @Override
    public Page<Action> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate) {

        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
            throw new InvalidDateRangeException();
        }

        if (startDate == null) {
            startDate = LocalDateTime.of(1970, 1, 1, 0, 0);
        }
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }

        Pageable pageable = PageRequest.of(pageNo, limit);

        List<Action> list = actionRepo.searchByTime(startDate, endDate);

        if(list.size() == 0){
            throw  new NoDataException("Action");
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min((startIndex + pageable.getPageSize()), list.size());

        List<Action> subList = list.subList(startIndex, endIndex);

        return new PageImpl<>(subList, pageable, list.size());
    }

    @Override
    public void save(Action action) {
        actionRepo.save(action);
    }

    @Override
    public void sendAction(Action action) {
        String message = gson.toJson(action);
        System.out.println(message);
        try {
            mqttService.sendMessageToMqtt("device/led", message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Action> getLastAction() {
        List<Action> lastAction = new ArrayList<>();
        lastAction =actionRepo.getLastAction();
        if(lastAction.size() == 0 || lastAction == null){
            throw  new NoDataException("Action");
        }
        return  lastAction;
    }


}
