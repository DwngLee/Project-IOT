package com.example.iot_be.repository;

import com.example.iot_be.enity.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActionRepo extends JpaRepository<Action, Integer> {
    @Query("SELECT a FROM Action a WHERE a.time BETWEEN ?1 AND ?2 ORDER BY a.time DESC")
    List<Action> searchByTime(LocalDateTime startDate, LocalDateTime endDate);

    @Query(value = "SELECT ah.id, ah.device_name, ah.action, ah.time " +
            "FROM action_history AS ah " +
            "JOIN (SELECT device_name, MAX(time) AS latest_time " +
            "      FROM action_history " +
            "      WHERE device_name IN ('den', 'quat') " +
            "      GROUP BY device_name) AS subq " +
            "ON ah.device_name = subq.device_name AND ah.time = subq.latest_time", nativeQuery = true)
    List<Action> getLastAction();

}
