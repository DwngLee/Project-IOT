package com.example.iot_be.service;

import com.example.iot_be.enity.Action;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface ActionService {
    Page<Action> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate, String sortColumn, String sortDirection);

    void sendAction(Action action);

}
