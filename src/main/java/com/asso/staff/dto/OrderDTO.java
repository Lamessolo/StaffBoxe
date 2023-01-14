package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.asso.staff.entity.Address;
import com.asso.staff.entity.OrderItem;
import com.asso.staff.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDTO implements Serializable {
	
	private String orderTrackingNumber;
	
	private int totalQuantity;
	
	private BigDecimal totalPrice;
	
	private String status;
	
	@CreationTimestamp
	private Date dateCreated;
	
	@UpdateTimestamp
	private Date lastUpdate;
	
	private UserDTO user;
	
	private AddressDTO shippingAddress;
	
	private AddressDTO billingAddress;
}
