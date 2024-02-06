package com.example.iot_be.repository;

import com.example.iot_be.enity.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepo extends JpaRepository<Action, Integer> {
}
