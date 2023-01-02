package com.asso.staff.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_address")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="street")
	private String street;
	
	@Column(name="city")
	private String city;
	
	
	@Column(name="state")
	private String state;
	
	
	@Column(name="country")
	private String country;
	
	@Column(name="zip_code")
	private String zipCode;
	
	@OneToOne
	@PrimaryKeyJoinColumn
	private Order order;
	
}
