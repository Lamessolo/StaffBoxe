package com.asso.staff.dto;

import java.util.Set;

import com.asso.staff.entity.Address;
import com.asso.staff.entity.Order;
import com.asso.staff.entity.OrderItem;
import com.asso.staff.entity.User;

import lombok.Data;

@Data
public class Purchase {

	private User user;
    private AdherentCreateDTO adherentCreate;
	private Address shippingAddress;
	private Address billingAddress;
	private Order order;
	private Set<OrderItem> orderItems;
	
}
