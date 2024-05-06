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
            "ORDER BY " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'ASC' THEN id END, " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'DESC' THEN id END DESC, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'ASC' THEN temperature END, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'DESC' THEN temperature END DESC, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'ASC' THEN humidity END, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'DESC' THEN humidity END DESC, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'ASC' THEN light END, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'DESC' THEN light END DESC, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'ASC' THEN created_at END, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'DESC' THEN created_at END DESC ", nativeQuery = true)
    List<DataSensor> getDataByFilter(String searchBy,
                                     String keyword,
                                     double minTemp,
                                     double maxTemp,
                                     double minHumid,
                                     double maxHumid,
                                     double minLight,
                                     double maxLight,
                                     String sortColumn,
                                     String sortDirection);


    @Query(value = "SELECT * FROM data_sensor " +
            "WHERE (id LIKE %:keyword% " +
            "    OR CONCAT(temperature, '') LIKE %:keyword% " +
            "    OR CONCAT(humidity,'') LIKE %:keyword% " +
            "    OR CONCAT(light, '') LIKE %:keyword% " +
            "    OR CONCAT(created_at, '') LIKE %:keyword%) " +
            "AND temperature BETWEEN :minTemp AND :maxTemp " +
            "AND humidity BETWEEN :minHumid AND :maxHumid " +
            "AND light BETWEEN :minLight AND :maxLight " +
            "ORDER BY " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'ASC' THEN id END, " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'DESC' THEN id END DESC, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'ASC' THEN temperature END, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'DESC' THEN temperature END DESC, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'ASC' THEN humidity END, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'DESC' THEN humidity END DESC, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'ASC' THEN light END, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'DESC' THEN light END DESC, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'ASC' THEN created_at END, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'DESC' THEN created_at END DESC "
            , nativeQuery = true)
    List<DataSensor> getAllData(String keyword,
                                double minTemp,
                                double maxTemp,
                                double minHumid,
                                double maxHumid,
                                double minLight,
                                double maxLight,
                                String sortColumn,
                                String sortDirection);
}
