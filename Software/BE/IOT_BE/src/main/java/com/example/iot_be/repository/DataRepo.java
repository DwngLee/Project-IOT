package com.example.iot_be.repository;
import com.example.iot_be.enity.Action;
import com.example.iot_be.enity.DataSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface DataRepo extends JpaRepository<DataSensor, Integer> {
    @Query("select data from DataSensor data where " +
            "data.createdAt between ?1 and ?2 and " +
            "data.temperature between ?3 and ?4 and " +
            "data.humidity between ?5 and ?6 and " +
            "data.light between ?7 and ?8")
    List<DataSensor> getDataByFilter(LocalDateTime startDate,
                                     LocalDateTime endDate,
                                     double minTemp,
                                     double maxTemp,
                                     double minHumid,
                                     double maxHumid,
                                     double minLight,
                                     double maxLight);
}
