package com.example.iot_be.service;

import com.example.iot_be.enity.Action;

import java.time.LocalDateTime;
import java.util.List;

public interface Command <T>{
    List<T> getAll();
    void save(T t);
    List<T> findByTime(LocalDateTime startDate, LocalDateTime endDate);
}
