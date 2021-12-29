package com.apurba.spring.jpa.postgresql.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "sensor_log")
public class sensorinput {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "time_entry")
	private Timestamp timeEntry;

	@Column(name = "flow_rate")
	private Float flowRate;

	@Column(name = "pressure")
	private Float pressure;

	public sensorinput() {

	}

	public sensorinput(Timestamp timeEntry, Float flowRate, Float pressure) {
		this.timeEntry = timeEntry;
		this.flowRate = flowRate;
		this.pressure = pressure;
	}

	public long getId() {
		return id;
	}

	public Timestamp getTimeEntry() {		return timeEntry;	}

	public void setTimeEntry(Timestamp timeEntry) {
		this.timeEntry = timeEntry;
	}

	public Float getFlowRate() {
		return flowRate;
	}

	public void setFlowRate(Float flowRate) {
		this.flowRate = flowRate;
	}

	public Float getPressure() {
		return pressure;
	}

	public void setPressure(Float pressure) {
		this.pressure = pressure;
	}

}
