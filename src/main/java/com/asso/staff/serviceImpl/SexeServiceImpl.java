package com.asso.staff.serviceImpl;

import org.springframework.stereotype.Service;

import com.asso.staff.dto.SexeDTO;
import com.asso.staff.entity.Sexe;
import com.asso.staff.repository.SexeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SexeServiceImpl {

	private final SexeRepository sexeRepo;
	
	
	
    public static SexeDTO mapEntityToDTO(Sexe sexe) {
    	SexeDTO sexeDTO = null;
		if(sexe == null) {
			return null;
		}
		
		if(sexe.getId() != 0) {
		        SexeDTO.builder()
				.id(sexe.getId())
				.name(sexe.getName())
				.build();
                }
		return sexeDTO;
		}

	public  Sexe mapDtoToEntity(long sexeDto) {
		
			Sexe newSexe = null;
			if(sexeDto == 0) {
				return null;				
			}
			if(sexeDto != 0) {
				
				newSexe = sexeRepo.findById(sexeDto).get();		
			}			
			return newSexe;
}
		
	
}
