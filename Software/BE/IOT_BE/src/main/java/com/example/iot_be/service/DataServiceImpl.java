package com.example.iot_be.service;
import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.repository.DataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;
@Controller
public class DataServiceImpl implements Command<DataSensor>{
    @Autowired
    DataRepo dataSensorRepo;
    @Override
    public List<DataSensor> getAll() {
        return dataSensorRepo.findAll();
    }
    @Override
    public void save(DataSensor dataSensor) {
        dataSensorRepo.save(dataSensor);
    }

    @Override
    public List<DataSensor> findByTime(LocalDateTime startDate, LocalDateTime endDate) {
        return null;
    }

}
