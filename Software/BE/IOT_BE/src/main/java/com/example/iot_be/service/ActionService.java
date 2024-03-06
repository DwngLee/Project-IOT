package com.example.iot_be.service;

import com.example.iot_be.enity.Action;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface ActionService {
    Page<Action> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate);
    void save(Action action);
    void sendAction(Action action);
    List<Action> getLastAction();
}
