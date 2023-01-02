package com.asso.staff.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="state")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class State {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
		
	private String name;
		
	@ManyToOne
	@JoinColumn(name="country_id")
	private Country country; 
	
}
