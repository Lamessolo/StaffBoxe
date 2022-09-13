package com.asso.staff.service;


import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import com.asso.staff.entity.Adherent;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.AdherentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdherentService {

	
	private final AdherentRepository adherentRepo;
	
	public Adherent addAdherent(Adherent adherent) {
		adherent.setAdherentId(UUID.randomUUID().toString());
		return adherentRepo.save(adherent);
	
	}
	
	public List<Adherent> getAllAdherent (){	
		return adherentRepo.findAll();	
	}
	
	public Adherent updateAdherent(Adherent adherent) {
		return adherentRepo.save(adherent);
	}
	
	public Adherent findAdherentById(Long id) {
		return adherentRepo.findAdherentById(id)
				.orElseThrow(()->new UserNotFoundException("User by id " + id + "was not found"));
	}
	
	public void deleteAdherent(Long id) {
		adherentRepo.deleteAdherentById(id);
	}
}
