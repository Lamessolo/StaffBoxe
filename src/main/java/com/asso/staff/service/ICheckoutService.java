package com.asso.staff.service;

import com.asso.staff.dto.Purchase;
import com.asso.staff.utils.PagePurchaseResponse;

public interface ICheckoutService {

	PagePurchaseResponse placeOrder (Purchase purchase);
}
