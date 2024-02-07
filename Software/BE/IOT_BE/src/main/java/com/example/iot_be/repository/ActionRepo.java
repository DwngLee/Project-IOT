package com.example.iot_be.repository;

import com.example.iot_be.enity.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActionRepo extends JpaRepository<Action, Integer> {
    @Query("Select action from Action  action where action.time between ?1 and ?2")
    List<Action> searchByTime(LocalDateTime startDate, LocalDateTime endDate);
}
