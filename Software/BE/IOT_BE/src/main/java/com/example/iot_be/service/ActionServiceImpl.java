package com.example.iot_be.service;

import com.example.iot_be.config.LocalDateTimeAdapter;
import com.example.iot_be.enity.Action;
import com.example.iot_be.exception.InvalidDateRangeException;
import com.example.iot_be.exception.NoDataException;
import com.example.iot_be.mqtt.MqttService;
import com.example.iot_be.repository.ActionRepo;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ActionServiceImpl implements ActionService {
    ActionRepo actionRepo;
    MqttService mqttService;

    private final static int MAX_LIMIT = 50;

    Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
            .create();

    @Override
    public Page<Action> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate, String sortColumn, String sortDirection) {

        if (startDate != null && endDate != null && endDate.isBefore(startDate)) {
            throw new InvalidDateRangeException();
        }

        if (startDate == null) {
            startDate = LocalDateTime.of(1970, 1, 1, 0, 0);
        }
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }

        limit = limit > MAX_LIMIT ? MAX_LIMIT : limit;

        Pageable pageable = PageRequest.of(pageNo, limit);

        List<Action> list = actionRepo.searchByTime(startDate, endDate, sortColumn, sortDirection);

        if (list.isEmpty()) {
            throw new NoDataException("Action");
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min((startIndex + pageable.getPageSize()), list.size());

        List<Action> subList = list.subList(startIndex, endIndex);

        return new PageImpl<>(subList, pageable, list.size());
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


}
