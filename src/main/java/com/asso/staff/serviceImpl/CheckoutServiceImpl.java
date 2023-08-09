package com.asso.staff.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.PaymentInfoDTO;
import com.asso.staff.dto.Purchase;
import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Order;
import com.asso.staff.entity.OrderItem;
import com.asso.staff.entity.User;
import com.asso.staff.repository.AdherentRepository;
import com.asso.staff.repository.UserRepository;
import com.asso.staff.service.ICheckoutService;
import com.asso.staff.utils.PagePurchaseResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Plan;


@Service
public class CheckoutServiceImpl implements ICheckoutService {

	private  UserRepository userRepository;
	
	public CheckoutServiceImpl(UserRepository userRepository,
		@Value("${stripe.key.secret}")String secretKey) {
		this.userRepository = userRepository;	
		Stripe.apiKey = secretKey;		
	}
	
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
	
			
		 //Check if this is an existing user
		 String emailUser =user.getEmail();
		 
		 User userFromDB = userRepository.findUserByEmail(emailUser);
		 if(userFromDB != null) { user = userFromDB;}
		 
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


	@Override
	public PaymentIntent createPaymentIntent(PaymentInfoDTO paymentInfoDto) throws StripeException {
		List<String> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");
		
		Map<String,Object> params = new HashMap<>();
		params.put("amount", paymentInfoDto.getAmount());
		params.put("currency", paymentInfoDto.getCurrency());
		params.put("payment_method_types", paymentMethodTypes);
		params.put("description", "Adhesion STAFF Boxe");
		params.put("receipt_email", paymentInfoDto.getReceiptEmail());
		
		return PaymentIntent.create(params);
	}
	
	
	@Override
	public Plan createPlan(PaymentInfoDTO paymentInfoDto) throws StripeException {
		List<String> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");
		
		Map<String, Object> params = new HashMap<>();
		params.put("amount", paymentInfoDto.getAmount()); // $100 in cents
		params.put("currency",  paymentInfoDto.getCurrency());
		params.put("interval", "month");
		params.put("interval_count", 1);
		params.put("product", paymentInfoDto.getSectionId());
						
		return  Plan.create(params);
	}
	
	
	
	

}
