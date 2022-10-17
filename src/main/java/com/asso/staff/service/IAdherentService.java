package com.asso.staff.service;

import java.util.List;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.utils.PageAdherentResponse;

public interface IAdherentService {

	Adherent addAdherent(Adherent adherent);
	
	PageAdherentResponse getAllAdherent(int pageNo,int pageSize,String sortBy);
	
	AdherentDTO createAdherent(AdherentCreateDTO adherentCreateDto) ;
	
	List<AdherentDTO> getAdherentBySectionId(long id);
	
	List<AdherentDTO> getAdherentBySexeId(long id);
	
	List<AdherentDTO> findAdherentByName(String name);
	
	AdherentDTO findAdherentById(Long id);
	
	AdherentDTO updateAdherent (long adherentId, AdherentCreateDTO adherentCreateDto);
}
