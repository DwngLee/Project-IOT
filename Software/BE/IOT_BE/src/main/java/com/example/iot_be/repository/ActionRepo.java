package com.example.iot_be.repository;

import com.example.iot_be.enity.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActionRepo extends JpaRepository<Action, Integer> {
    @Query(value = "SELECT * FROM action_history WHERE time BETWEEN :startDate AND :endDate " +
            "ORDER BY " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'ASC' THEN id END ASC, " +
            "CASE WHEN :sortColumn = 'id' AND :sortDirection = 'DESC' THEN id END DESC, " +
            "CASE WHEN :sortColumn = 'device_name' AND :sortDirection = 'ASC' THEN device_name END ASC, " +
            "CASE WHEN :sortColumn = 'device_name' AND :sortDirection = 'DESC' THEN device_name END DESC, " +
            "CASE WHEN :sortColumn = 'action' AND :sortDirection = 'ASC' THEN action END ASC, " +
            "CASE WHEN :sortColumn = 'action' AND :sortDirection = 'DESC' THEN action END DESC, " +
            "CASE WHEN :sortColumn = 'time' AND :sortDirection = 'ASC' THEN time END ASC, " +
            "CASE WHEN :sortColumn = 'time' AND :sortDirection = 'DESC' THEN time END DESC "
            , nativeQuery = true)
    List<Action> searchByTime(LocalDateTime startDate, LocalDateTime endDate, String sortColumn, String sortDirection);



}
