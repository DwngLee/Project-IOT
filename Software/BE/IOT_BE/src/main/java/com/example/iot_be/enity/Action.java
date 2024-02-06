package com.example.iot_be.enity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;


import java.time.LocalDateTime;
@Entity
@Table(name = "action_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Action {
    @Id
    private int id;
    @Column(name = "device_name")
    private String deviceName;
    private String action;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime time;
}
