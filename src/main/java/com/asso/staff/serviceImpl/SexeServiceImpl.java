package com.asso.staff.serviceImpl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.dto.SexeDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Categorie;
import com.asso.staff.entity.Section;
import com.asso.staff.entity.Sexe;
import com.asso.staff.exception.ResourceNotFoundException;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.SexeRepository;
import com.asso.staff.service.ISexeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SexeServiceImpl implements ISexeService{

	private final SexeRepository sexeRepository;
	private final ModelMapper mapper;
	
	public SexeDTO mapEntityToDTO(Sexe sexe) {		
		SexeDTO sexeDto = mapper.map(sexe, SexeDTO.class);	
		    return sexeDto;			
	}
		
	public  Sexe mapDtoToEntity(SexeDTO sexeDto){
		
		Sexe newSexe = mapper.map(sexeDto, Sexe.class);	 
	return newSexe;
	
}
		
	@Override
	public SexeDTO createSexe(SexeDTO sexeDto) {
		// Je transforme le SexeDTO en une nouvelle entité Sexe
		Sexe sexeNew = mapDtoToEntity(sexeDto);		
	    sexeRepository.save(sexeNew);
	    //Je revenvoi le DTO 
	    return mapEntityToDTO(sexeNew);	
	}

	
	@Override
	public List<SexeDTO> getAllSexe() {
		List<Sexe> listeSexe = sexeRepository.findAll();
		List<SexeDTO> listeSexeDto = listeSexe.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return listeSexeDto;
	}

	@Override
	public SexeDTO findSexeById(Long id) {
		Sexe entitySexe = sexeRepository.findSexeById(id)
				.orElseThrow(()->new UserNotFoundException("Sexe by id " + id + "was not found"));
		return mapEntityToDTO(entitySexe);
	}

	@Override
	public SexeDTO updateSexe(long sexeId, SexeDTO sexeDto) {
		// Recuperer le sexe entite by Id
		Sexe sexe = sexeRepository.findById(sexeId)
				.orElseThrow(()-> new ResourceNotFoundException("Sexe","id", sexeId));
		sexe.setName(sexeDto.getName());						
		Sexe sexeUpdated = sexeRepository.save(sexe);
		
		return mapEntityToDTO(sexeUpdated);
	
	}

	@Override
	public Map<String, Boolean> deleteSexe(long sexeId) {
		// TODO Auto-generated method stub
		return null;
	}
		
	
}
