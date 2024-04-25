package com.example.iot_be.repository;

import com.example.iot_be.enity.DataSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DataRepo extends JpaRepository<DataSensor, Integer> {
    @Query(value = "SELECT * FROM data_sensor " +
            "WHERE CONCAT(" +
            "CASE WHEN :searchBy = 'id' THEN CAST(id AS CHAR) ELSE '' END, " +
            "CASE WHEN :searchBy = 'temperature' THEN CAST(temperature AS CHAR) ELSE '' END, " +
            "CASE WHEN :searchBy = 'humidity' THEN CAST(humidity AS CHAR) ELSE '' END, " +
            "CASE WHEN :searchBy = 'light' THEN CAST(light AS CHAR) ELSE '' END, " +
            "CASE WHEN :searchBy = 'created_at' THEN CAST(created_at AS CHAR) ELSE '' END, " +
            "CASE WHEN :searchBy = 'dust' THEN CAST(dust AS CHAR) ELSE '' END" +
            ") LIKE CONCAT('%', :keyword, '%') " +
            "AND temperature BETWEEN :minTemp AND :maxTemp " +
            "AND humidity BETWEEN :minHumid AND :maxHumid " +
            "AND light BETWEEN :minLight AND :maxLight " +
            "AND dust BETWEEN :minDust AND :maxDust " +
            "ORDER BY " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'ASC' THEN id END ASC, " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'DESC' THEN id END DESC, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'ASC' THEN temperature END ASC, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'DESC' THEN temperature END DESC, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'ASC' THEN humidity END ASC, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'DESC' THEN humidity END DESC, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'ASC' THEN light END ASC, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'DESC' THEN light END DESC, "  +
            "CASE WHEN :sortColumn = 'dust' AND :sortDirection = 'ASC' THEN dust END ASC, " +
            "CASE WHEN :sortColumn = 'dust' AND :sortDirection = 'DESC' THEN dust END DESC, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'ASC' THEN created_at END ASC, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'DESC' THEN created_at END DESC ", nativeQuery = true)

    List<DataSensor> getDataByFilter(String searchBy,
                                     String keyword,
                                     double minTemp,
                                     double maxTemp,
                                     double minHumid,
                                     double maxHumid,
                                     double minLight,
                                     double maxLight,
                                     double minDust,
                                     double maxDust,
                                     String sortColumn,
                                     String sortDirection);


    @Query(value = "SELECT * FROM data_sensor " +
            "WHERE (id LIKE %:keyword% " +
            "    OR temperature LIKE %:keyword% " +
            "    OR humidity LIKE %:keyword% " +
            "    OR light LIKE %:keyword% " +
            "    OR created_at LIKE %:keyword%" +
            "    OR dust LIKE %:keyword%) " +
            "AND temperature BETWEEN :minTemp AND :maxTemp " +
            "AND humidity BETWEEN :minHumid AND :maxHumid " +
            "AND light BETWEEN :minLight AND :maxLight " +
            "AND dust BETWEEN  :minDust AND :maxDust " +
            "ORDER BY " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'ASC' THEN id END ASC, " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'DESC' THEN id END DESC, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'ASC' THEN temperature END ASC, " +
            "CASE WHEN :sortColumn = 'temperature' AND :sortDirection = 'DESC' THEN temperature END DESC, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'ASC' THEN humidity END ASC, " +
            "CASE WHEN :sortColumn = 'humidity' AND :sortDirection = 'DESC' THEN humidity END DESC, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'ASC' THEN light END ASC, " +
            "CASE WHEN :sortColumn = 'light' AND :sortDirection = 'DESC' THEN light END DESC, " +
            "CASE WHEN :sortColumn = 'dust' AND :sortDirection = 'ASC' THEN dust END ASC, " +
            "CASE WHEN :sortColumn = 'dust' AND :sortDirection = 'DESC' THEN dust END DESC, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'ASC' THEN created_at END ASC, " +
            "CASE WHEN :sortColumn = 'created_at' AND :sortDirection = 'DESC' THEN created_at END DESC ", nativeQuery = true)
    List<DataSensor> getAllData(String keyword,
                                double minTemp,
                                double maxTemp,
                                double minHumid,
                                double maxHumid,
                                double minLight,
                                double maxLight,
                                double minDust,
                                double maxDust,
                                String sortColumn,
                                String sortDirection);
}
