package com.asso.staff.controller;

import org.jboss.logging.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.dto.PaymentInfoDTO;
import com.asso.staff.dto.Purchase;
import com.asso.staff.entity.Adherent;
import com.asso.staff.service.IAdherentService;
import com.asso.staff.service.ICheckoutService;
import com.asso.staff.utils.PagePurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/checkout")
@CrossOrigin
public class CheckoutController {

	private final ICheckoutService checkoutservice;
	private final IAdherentService adherentservice;
	
	private Logger logger = Logger.getLogger(getClass().getName());
	
	@PostMapping("/purchase")
	public PagePurchaseResponse placeOrder(@RequestBody Purchase purchase) {
		
		PagePurchaseResponse pagePurchaseResponse = checkoutservice.placeOrder(purchase);	
	/*	AdherentCreateDTO adherent = purchase.getAdherentCreate();
		AdherentDTO newAdherent = adherentservice.createAdherent(adherent);*/
		
		return pagePurchaseResponse;
	}
	
	@PostMapping("/payment-intent")
	public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoDTO paymentInfoDto)throws StripeException
	{
		logger.info("paymentInfoDto.amount" + paymentInfoDto.getAmount());
		PaymentIntent paymentIntent = checkoutservice.createPaymentIntent(paymentInfoDto);
		String paymentStr = paymentIntent.toJson();
		
		return new ResponseEntity<>(paymentStr, HttpStatus.OK);
		
	}
	
}
