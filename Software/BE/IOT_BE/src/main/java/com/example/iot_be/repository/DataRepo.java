package com.example.iot_be.repository;

import com.example.iot_be.enity.DataSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DataRepo extends JpaRepository<DataSensor, Integer> {
    @Query(value = "SELECT * FROM data_sensor " +
            "WHERE CONCAT(" +
            "CASE WHEN :searchBy = 'id' THEN id ELSE '' END, " +
            "CASE WHEN :searchBy = 'temperature' THEN temperature ELSE '' END, " +
            "CASE WHEN :searchBy = 'humidity' THEN humidity ELSE '' END, " +
            "CASE WHEN :searchBy = 'light' THEN light ELSE '' END, " +
            "CASE WHEN :searchBy = 'created_at' THEN created_at ELSE '' END" +
            ") LIKE %:keyword% " +
            "AND temperature BETWEEN :minTemp AND :maxTemp " +
            "AND humidity BETWEEN :minHumid AND :maxHumid " +
            "AND light BETWEEN :minLight AND :maxLight " +
            "ORDER BY created_at DESC", nativeQuery = true)
    List<DataSensor> getDataByFilter(String searchBy,
                                     String keyword,
                                     double minTemp,
                                     double maxTemp,
                                     double minHumid,
                                     double maxHumid,
                                     double minLight,
                                     double maxLight);



    @Query(value = "SELECT * FROM data_sensor " +
            "WHERE id LIKE %?1% " +
            "OR temperature LIKE %?1% " +
            "OR humidity LIKE %?1% " +
            "OR light LIKE %?1% " +
            "OR created_at LIKE %?1% " +
            "AND temperature BETWEEN ?2 AND ?3 " +
            "AND humidity BETWEEN ?4 AND ?5 " +
            "AND light BETWEEN ?6 AND ?7 " +
            "ORDER BY created_at DESC", nativeQuery = true)
    List<DataSensor> getAllData(String keyword,
                                double minTemp,
                                double maxTemp,
                                double minHumid,
                                double maxHumid,
                                double minLight,
                                double maxLight);


}
