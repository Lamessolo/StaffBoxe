package com.asso.staff.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.Purchase;
import com.asso.staff.service.ICheckoutService;
import com.asso.staff.utils.PagePurchaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/checkout")
@CrossOrigin
public class CheckoutController {

	private final ICheckoutService checkoutservice;
	
	
	@PostMapping("/purchase")
	public PagePurchaseResponse placeOrder(@RequestBody Purchase purchase) {
		
		PagePurchaseResponse pagePurchaseResponse = checkoutservice.placeOrder(purchase);
		
		return pagePurchaseResponse;
	}
	
}
