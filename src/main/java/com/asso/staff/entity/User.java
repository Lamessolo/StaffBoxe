package com.asso.staff.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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


	public User(long id, String name, String lastName, String email) {
		super();
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.email = email;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
			
	@Column(name="name")
	private String name;
		
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="email", unique=true)
	private String email;
	
	@Column(name="phone_contact")
	private String Phone;
	
	@OneToMany(mappedBy="user", cascade= CascadeType.ALL)
	private Set<Order> orders = new HashSet<>();
	
	public void add(Order order) {
		if(order != null) {
			if(orders == null) {
				orders = new HashSet<>();
			}
			
			orders.add(order);
			order.setUser(this);
		}
	}
	
}
