package com.asso.staff.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.dto.CategorieDTO;
import com.asso.staff.dto.SectionDTO;
import com.asso.staff.dto.SexeDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Section;
import com.asso.staff.entity.Sexe;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.AdherentRepository;
import com.asso.staff.repository.SectionRepository;
import com.asso.staff.service.IAdherentService;
import com.asso.staff.validator.AdherentValidator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdherentServiceImpl implements IAdherentService{

	
	
	private final AdherentRepository adherentRepo;
	private final SectionRepository sectionRepo;
	private final ModelMapper mapper;
	
	public Adherent addAdherent(Adherent adherent) {
		adherent.setAdherentId(UUID.randomUUID().toString());
		return adherentRepo.save(adherent);
	
	}
	
	public List<AdherentDTO> getAllAdherent(int page,int size,String field){
		
		PageRequest pegeable =PageRequest.of(page, size).withSort(Sort.by(field));
		Page<Adherent> listeAdherent = adherentRepo.findAll(pegeable);
		List<AdherentDTO> adherents = listeAdherent.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return adherents;	
	}
	
	
	public AdherentDTO saveAdherent(AdherentCreateDTO adherentCreateDto) {
		
		// Je transforme l'AdherentDTO en entité nouvelle adherent
		Adherent adherentNew = mapDtoToEntity(adherentCreateDto);
		// Je sauve une entité dans la base
		    addAdherent(adherentNew);
		//adherentRepo.save(adherentNew);
		return mapEntityToDTO(adherentNew);
	}
	
	public List<AdherentDTO> getAdherentBySectionId(long id) {
		List<Adherent> listAdherentBySection = adherentRepo.findBySectionId(id);
		List<AdherentDTO> adherentsBySection = listAdherentBySection.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return adherentsBySection;
		
	}
	
	public List<AdherentDTO> getAdherentBySexeId(long id) {
		List<Adherent> listAdherentBySexe = adherentRepo.findBySexeId(id);
		List<AdherentDTO> adherentsBySexe = listAdherentBySexe.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return adherentsBySexe;
		
	}
	
	public List<AdherentDTO> findAdherentByName(String name) {		
		List<Adherent> findAdherentByName = adherentRepo.findByNameContaining(name);
		List<AdherentDTO> adherents = findAdherentByName.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return adherents;
	}
	
	
	
	public AdherentDTO findAdherentById(Long id) {
		if(id == null) {
			return null ; 
		}
		Adherent entity = adherentRepo.findAdherentById(id)
				.orElseThrow(()->new UserNotFoundException("Adherent by id " + id + "was not found"));
		return mapEntityToDTO(entity);
	}
	
	public void deleteAdherent(Long id) {
		adherentRepo.deleteAdherentById(id);
	}
	
	private AdherentDTO mapEntityToDTO(Adherent adherent) {
		
		 //SexeServiceImpl.mapEntityToDTO(adherent.getSexe());
		
		 AdherentDTO adherentDto = mapper.map(adherent, AdherentDTO.class);
	/*	AdherentDTO adherentDto = new AdherentDTO();
		adherentDto.setId(adherent.getId());
		adherentDto.setAdherentId(adherent.getAdherentId());
		adherentDto.setName(adherent.getName());
		adherentDto.setPrenom(adherent.getPrenom());
		adherentDto.setImageUrl(adherent.getImageUrl());
		adherentDto.setPoid(adherent.getPoid());
		adherentDto.setStatut(adherent.getStatut());
		adherentDto.setAdresse(adherent.getAdresse());
		adherentDto.setPhone(adherent.getPhone());
		adherentDto.setEmail(adherent.getEmail());

	/*	adherentDto.setSexe(SexeService.mapEntityToDTO(adherent.getSexe()));
		adherentDto.setSection(SectionService.mapEntityToDTO(adherent.getSection()));
	     adherentDto.setCategorie(CategorieService.mapEntityToDTO(adherent.getCategorie()));*/
		return adherentDto;			
	}
	
	public  Adherent mapDtoToEntity(AdherentCreateDTO adherentCreateDto) {
	
			Adherent newAdherent = mapper.map(adherentCreateDto, Adherent.class);	
	     /*	Adherent newAdherent = new Adherent();
			String newAdherentId = adherentCreateDto.getName().toLowerCase() + "_" + adherentCreateDto.getPrenom()+ "_Id";
			newAdherent.setAdherentId(newAdherentId);
			newAdherent.setName(adherentCreateDto.getName());
			newAdherent.setPrenom(adherentCreateDto.getPrenom());
			newAdherent.setImageUrl(adherentCreateDto.getImageUrl());
			newAdherent.setPoid(adherentCreateDto.getPoid());
			newAdherent.setStatut(adherentCreateDto.getStatut());
			newAdherent.setAdresse(adherentCreateDto.getAdresse());
			newAdherent.setPhone(adherentCreateDto.getPhone());
			newAdherent.setEmail(adherentCreateDto.getEmail());	
								
			/*
			newAdherent.setSection(AdherentService.mapDtoToEntity(adherentCreateDto.getSection()));
					
			newAdherent.setSexe(mapDtoToEntity(adherentCreateDto.getSexe()));
				
			newAdherent.setCategorie(mapDtoToEntity(adherentCreateDto.getCategorie()));
				*/
		
		return newAdherent;
		
	}

	
	
}
