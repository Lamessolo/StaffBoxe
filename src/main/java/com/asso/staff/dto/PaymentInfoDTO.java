package com.asso.staff.dto;

import lombok.Data;

@Data
public class PaymentInfoDTO {

	private int amount;	
	private String currency;
	private String receiptEmail;
	// Je rajoute la sectionId pour la creation d'un Plan (Paiement en plusieurs fois)
	private String SectionId;
	
}
