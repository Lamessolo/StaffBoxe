package com.asso.staff.validator;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;

public class AdherentValidator {

	public static List<String> validate (AdherentCreateDTO adherentCreateDto){
		
		List<String> errors = new ArrayList<>();
		
		if(adherentCreateDto == null) {
			errors.add("Veuillez renseigner l' id de l'adherent");
			errors.add("Veuillez renseigner le nom de l'adherent");
			errors.add("Veuillez renseigner le prenom de l'adherent");
			errors.add("Veuillez renseigner l'email de l'adherent");
			
		}
		
		// Validation de l'adherentID
		if(!StringUtils.hasLength(adherentCreateDto.getAdherentId())) {
			errors.add("Veuillez renseigner l' id de l'adherent");
		}
		
		if(!StringUtils.hasLength(adherentCreateDto.getName())) {
			errors.add("Veuillez renseigner le nom de l'adherent");
		}
		
		if(!StringUtils.hasLength(adherentCreateDto.getPrenom())) {
			errors.add("Veuillez renseigner le prenom de l'adherent");
		}
		
		if(!StringUtils.hasLength(adherentCreateDto.getEmail())) {
			errors.add("Veuillez renseigner l'email de l'adherent");
		}

	/*	if(adherentCreateDto.getSection() == 0) {
			errors.add("Veuillez renseigner une section existante pour l'adherent");
		} */
			
		return errors;
	}
}
