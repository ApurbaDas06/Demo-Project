package com.apurba.spring.jpa.postgresql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apurba.spring.jpa.postgresql.model.sensorinput;

public interface SesnorRepository extends JpaRepository<sensorinput, Long> {
//  List<Sensor_Input> findByPublished(boolean published);
//
//  List<Sensor_Input> findByTitleContaining(String title);
}
