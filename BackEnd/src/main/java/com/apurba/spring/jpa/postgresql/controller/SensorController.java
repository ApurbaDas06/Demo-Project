package com.apurba.spring.jpa.postgresql.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.apurba.spring.jpa.postgresql.model.sensorinput;
import com.apurba.spring.jpa.postgresql.repository.SesnorRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class SensorController {

	@Autowired
	SesnorRepository SensorManager;

	@GetMapping("/sensorInput")
	public ResponseEntity<List<sensorinput>> getAllSensor(@RequestParam(required = false) String title) {
		try {
			List<sensorinput> sensorInputs = new ArrayList<sensorinput>();

			SensorManager.findAll().forEach(sensorInputs::add);

			if (sensorInputs.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(sensorInputs, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/sensorInput/{id}")
	public ResponseEntity<sensorinput> getSensorById(@PathVariable("id") long id) {
		Optional<sensorinput> sensorData = SensorManager.findById(id);

		if (sensorData.isPresent()) {
			return new ResponseEntity<>(sensorData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/sensorInput")
	public ResponseEntity<sensorinput> createSensor(@RequestBody sensorinput sensorInput) {
		try {
			sensorinput _sensorInput = SensorManager
					.save(new sensorinput(sensorInput.getTimeEntry(), sensorInput.getFlowRate(), sensorInput.getPressure()));
			return new ResponseEntity<>(_sensorInput, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/sensorInput")
	public ResponseEntity<HttpStatus> deleteAllEntries() {
		try {
			SensorManager.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}


}
