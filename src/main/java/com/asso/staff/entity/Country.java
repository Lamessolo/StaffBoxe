package com.asso.staff.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="country")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Country implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="code")
	private String code;
	
	@Column(name="name")
	private String name;
	
	// TODO : Set up one to many with states
	
	@OneToMany(mappedBy="country")
	@JsonIgnore
	private List<State> states;
}
