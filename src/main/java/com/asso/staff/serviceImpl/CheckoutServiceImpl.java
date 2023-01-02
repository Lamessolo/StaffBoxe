package com.asso.staff.serviceImpl;

import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.asso.staff.dto.Purchase;
import com.asso.staff.entity.Order;
import com.asso.staff.entity.OrderItem;
import com.asso.staff.entity.User;
import com.asso.staff.repository.UserRepository;
import com.asso.staff.service.ICheckoutService;
import com.asso.staff.utils.PagePurchaseResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements ICheckoutService {

	private final UserRepository userRepository;

	
	@Override
	@Transactional
	public PagePurchaseResponse placeOrder(Purchase purchase) {
   // Retrieve the order info from dto
		
		Order order = purchase.getOrder();		
		// Generate tracking number
		
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);
		
		//populate order with orderItems
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));
		
		// Populate order with billingAddress and shippingAddress
		
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());
		// Populate user with order
		
		 User user = purchase.getUser();
		 user.add(order);
		// Save into database
		
		 userRepository.save(user);
		// return a response

		 
		return new PagePurchaseResponse(orderTrackingNumber);
	}


	private String generateOrderTrackingNumber() {

		// Generate a random UUID number (UUID version 4)
		
		
		return UUID.randomUUID().toString();
	}

}
