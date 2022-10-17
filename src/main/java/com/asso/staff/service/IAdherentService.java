package com.asso.staff.service;

import java.util.List;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.entity.Adherent;

public interface IAdherentService {

	Adherent addAdherent(Adherent adherent);
	
	List<AdherentDTO> getAllAdherent(int page,int size,String field);
	
	AdherentDTO saveAdherent(AdherentCreateDTO adherentCreateDto) ;
	
	List<AdherentDTO> getAdherentBySectionId(long id);
	
	List<AdherentDTO> getAdherentBySexeId(long id);
	
	List<AdherentDTO> findAdherentByName(String name);
	
	AdherentDTO findAdherentById(Long id);
}
