package com.example.iot_be.service;

import com.example.iot_be.enity.DataSensor;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public interface DataService {

    Page<DataSensor> getAll(int pageNo,
                            int limit,
                            LocalDateTime startDate,
                            LocalDateTime endDate,
                            double minTemp,
                            double maxTemp,
                            double minHumid,
                            double maxHumid,
                            double minLight,
                            double maxLight);

    void save(DataSensor dataSensor);
}
