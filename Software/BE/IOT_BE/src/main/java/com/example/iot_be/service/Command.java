package com.example.iot_be.service;

import com.example.iot_be.enity.Action;
import com.example.iot_be.exception.NoDataException;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface Command <T>{
    Page<T> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate);
    Page<T> getAll(int pageNo,
                   int limit,
                   LocalDateTime startDate,
                   LocalDateTime endDate,
                   double minTemp,
                   double maxTemp,
                   double minHumid,
                   double maxHumid,
                   double minLight,
                   double maxLight);
    void save(T t);

}
