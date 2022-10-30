package com.asso.staff.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Categorie;
import com.asso.staff.entity.Section;
import com.asso.staff.entity.Sexe;
import com.asso.staff.exception.ResourceNotFoundException;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.AdherentRepository;
import com.asso.staff.repository.CategorieRepository;
import com.asso.staff.repository.SectionRepository;
import com.asso.staff.repository.SexeRepository;
import com.asso.staff.service.IAdherentService;
import com.asso.staff.utils.PageAdherentResponse;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdherentServiceImpl implements IAdherentService{

	
	
	private final AdherentRepository adherentRepository;
	private final SexeRepository sexeRepository;
	private final CategorieRepository categorieRepository;
	private final SectionRepository sectionRepository;
	private final ModelMapper mapper;
	
	public Adherent addAdherent(Adherent adherent) {
		adherent.setAdherentId(adherent.getName()+ adherent.getPrenom().trim() +"_"+ adherent.getPrenom().toLowerCase());
		return adherentRepository.save(adherent);
	
	}
	
	public PageAdherentResponse getAllAdherent(int pageNo,int pageSize,String sortBy){
		
		PageRequest pegeable = PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
		Page<Adherent> listeAdherent = adherentRepository.findAll(pegeable);
		List<Adherent> adherents = listeAdherent.getContent();
		List<AdherentDTO> content = listeAdherent.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		
		PageAdherentResponse pageAdherentResponse = new PageAdherentResponse();
		pageAdherentResponse.setContent(content);
		pageAdherentResponse.setPageNo(listeAdherent.getNumber());
		pageAdherentResponse.setPageSize(listeAdherent.getSize());
		pageAdherentResponse.setTotalElements(listeAdherent.getTotalElements());
		pageAdherentResponse.setTotalPages(listeAdherent.getTotalPages());
		pageAdherentResponse.setLast(listeAdherent.isLast());
		return pageAdherentResponse;	
	}
	

	public AdherentDTO createAdherent(AdherentCreateDTO adherentCreateDto) {
		
		// Je transforme l'AdherentDTO en entité nouvelle adherent
		Adherent adherentNew = mapDtoToEntity(adherentCreateDto);
		Sexe sexe = sexeRepository.findById(adherentCreateDto.getSexe())
				.orElseThrow(()-> new ResourceNotFoundException("Sexe","id",adherentCreateDto.getSexe()));
		Section section = sectionRepository.findById(adherentCreateDto.getSection())
				.orElseThrow(()-> new ResourceNotFoundException("Section","id",adherentCreateDto.getSection()));
		Categorie categorie = categorieRepository.findById(adherentCreateDto.getCategorie())
				.orElseThrow(()-> new ResourceNotFoundException("Categorie","id",adherentCreateDto.getCategorie()));
		adherentNew.setSexe(sexe);
		adherentNew.setSection(section);
		adherentNew.setCategorie(categorie);
		// Je sauve une entité dans la base
		    addAdherent(adherentNew);
		//adherentRepo.save(adherentNew);
		return mapEntityToDTO(adherentNew);
	}
	
	public List<AdherentDTO> getAdherentBySectionId(long id) {
		List<Adherent> listAdherentBySection = adherentRepository.findBySectionId(id);
		List<AdherentDTO> adherentsBySection = listAdherentBySection.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return adherentsBySection;
		
	}
	
	public List<AdherentDTO> getAdherentBySexeId(long id) {
		List<Adherent> listAdherentBySexe = adherentRepository.findBySexeId(id);
		List<AdherentDTO> adherentsBySexe = listAdherentBySexe.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return adherentsBySexe;
		
	}
	
	public List<AdherentDTO> findAdherentByName(String name) {		
		List<Adherent> findAdherentByName = adherentRepository.findByNameContaining(name);
		List<AdherentDTO> adherents = findAdherentByName.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return adherents;
	}
	
	
	
	public AdherentDTO findAdherentById(Long id) {
		Adherent entityAdherent = adherentRepository.findAdherentById(id)
				.orElseThrow(()->new UserNotFoundException("Adherent by id " + id + "was not found"));
		return mapEntityToDTO(entityAdherent);
	}
	
	
	@Override
	public AdherentDTO updateAdherent(long adherentId, AdherentCreateDTO adherentCreateDto) {
		// Recuperer adherent entite by Id
		Adherent adherent = adherentRepository.findById(adherentId)
				.orElseThrow(()-> new ResourceNotFoundException("Adherent", "id", adherentId));
		
		Sexe sexe = sexeRepository.findById(adherentCreateDto.getSexe())
				.orElseThrow(()-> new ResourceNotFoundException("Sexe", "id", adherentCreateDto.getSexe()));
		Section section = sectionRepository.findById(adherentCreateDto.getSection())
				.orElseThrow(()-> new ResourceNotFoundException("Section","id",adherentCreateDto.getSection()));
		Categorie categorie = categorieRepository.findById(adherentCreateDto.getCategorie())
				.orElseThrow(()-> new ResourceNotFoundException("Categorie","id",adherentCreateDto.getCategorie()));
		
		adherent.setName(adherentCreateDto.getName());
		adherent.setPrenom(adherentCreateDto.getPrenom());
		adherent.setPoid(adherentCreateDto.getPoid());
		adherent.setAdresse(adherentCreateDto.getAdresse());
		adherent.setEmail(adherentCreateDto.getEmail());
		adherent.setDateNaissance(adherentCreateDto.getDateNaissance());
		adherent.setPhone(adherentCreateDto.getPhone());
		adherent.setStatut(adherentCreateDto.getStatut());
		adherent.setSexe(sexe);
		adherent.setSection(section);
		adherent.setCategorie(categorie);
		
		Adherent adherentUpdated = adherentRepository.save(adherent);
		
		return mapEntityToDTO(adherentUpdated);
	}

	
	
	public Map<String,Boolean> deleteAdherent(long id) {
		Adherent entityAdherent = adherentRepository.findAdherentById(id)
				.orElseThrow(()->new UserNotFoundException("Adherent by id " + id + "was not found"));
		adherentRepository.delete(entityAdherent);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
		
	}
	
	private AdherentDTO mapEntityToDTO(Adherent adherent) {
				
		 AdherentDTO adherentDto = mapper.map(adherent, AdherentDTO.class);
	
		return adherentDto;			
	}
	
	

	public  Adherent mapDtoToEntity(AdherentCreateDTO adherentCreateDto) {
	
			Adherent newAdherent = mapper.map(adherentCreateDto, Adherent.class);	
	     
		return newAdherent;
		
	}
	
	
}
