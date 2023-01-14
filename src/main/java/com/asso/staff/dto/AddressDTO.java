package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO implements Serializable {
	
	private long id;
		
	private String street;
		
	private String city;
		
	private String state;
	
	private String country;
	
	private String zipCode;
	
}
