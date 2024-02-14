package com.example.iot_be.enity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "data_sensor")
@JsonIgnoreProperties(ignoreUnknown = true)
public class DataSensor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private double temperature;
    private double humidity;
    private double light;
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
}
