package com.example.iot_be.repository;
import com.example.iot_be.enity.DataSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DataRepo extends JpaRepository<DataSensor, Integer> {

    @Query("SELECT d FROM DataSensor d WHERE " +
            "(:type is null or :type = 'temperature' and d.temperature LIKE %:keyword%) or " +
            "(:type is null or :type = 'humidity' and d.humidity LIKE %:keyword%) or " +
            "(:type is null or :type = 'light' and d.light LIKE %:keyword%)")
    List<DataSensor> searchByTypeAndKeyword(@Param("type") String type, @Param("keyword") String keyword);
}
