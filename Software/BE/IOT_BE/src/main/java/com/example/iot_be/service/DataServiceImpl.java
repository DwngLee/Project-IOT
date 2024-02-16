package com.example.iot_be.service;
import com.example.iot_be.enity.DataSensor;
import com.example.iot_be.repository.DataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;
@Controller
public class DataServiceImpl implements Command<DataSensor>{
    @Autowired
    DataRepo dataSensorRepo;

    @Override
    public Page<DataSensor> getAll(int pageNo, int limit, LocalDateTime startDate, LocalDateTime endDate) {
        return null;
    }

    @Override
    public Page<DataSensor> getAll(int pageNo,
                                   int limit,
                                   LocalDateTime startDate,
                                   LocalDateTime endDate,
                                   double minTemp,
                                   double maxTemp,
                                   double minHumid,
                                   double maxHumid,
                                   double minLight,
                                   double maxLight) {
        if (startDate == null) {
            startDate = LocalDateTime.of(1970, 1, 1, 0, 0);
        }
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }
        List<DataSensor> list = dataSensorRepo.getDataByFilter(startDate, endDate, minTemp, maxTemp, minHumid, maxHumid, minLight, maxLight);
        Pageable pageable = PageRequest.of(pageNo-1, limit);

        int startIndex = (int) pageable.getOffset();
        int endIndex = (int)Math.min(pageable.getOffset() + pageable.getPageSize(), list.size());
        List<DataSensor> subList = list.subList(startIndex, endIndex);

        return new PageImpl<>(subList, pageable, list.size());
    }

    @Override
    public void save(DataSensor dataSensor) {
        dataSensorRepo.save(dataSensor);
    }
}
