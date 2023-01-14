package com.asso.staff.service;

import com.asso.staff.dto.PaymentInfoDTO;
import com.asso.staff.dto.Purchase;
import com.asso.staff.utils.PagePurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;


public interface ICheckoutService {

	PagePurchaseResponse placeOrder (Purchase purchase);
	PaymentIntent createPaymentIntent (PaymentInfoDTO  paymentInfoDto) throws StripeException;
}
