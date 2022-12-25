package com.asso.staff.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {


	
	public User(long id, String name, String email) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
			
	@Column(name="name")
	private String name;
		
	
	@Column(name="email", unique=true)
	private String email;
	
	@Column(name="phone_contact")
	private String Phone;
	
	
	
}
