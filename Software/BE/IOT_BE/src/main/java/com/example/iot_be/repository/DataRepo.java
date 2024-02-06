package com.example.iot_be.repository;

import com.example.iot_be.enity.DataSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataRepo extends JpaRepository<DataSensor, Integer> {
}
