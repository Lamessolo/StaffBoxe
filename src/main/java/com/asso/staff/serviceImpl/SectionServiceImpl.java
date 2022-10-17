package com.asso.staff.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.dto.SectionDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Section;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.SectionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SectionServiceImpl {

	private final SectionRepository sectionRepo;
	
	
     public List<SectionDTO> getAllSection (){
		
		List<Section> listeSection = sectionRepo.findAll();
		List<SectionDTO> sections = listeSection.stream().map(this::mapToDTO).collect(Collectors.toList());
		return sections ;	
       }
     
     public SectionDTO findSectionById(Long id) {
 		Section section = sectionRepo.findById(id)
 				.orElseThrow(()->new UserNotFoundException("Section by id " + id + "was not found"));
 		return mapEntityToDTO(section);
 	}
		
	 private SectionDTO mapToDTO(Section section) {
								
			return mapEntityToDTO(section);
	} 
		
	 /* A partir d'une section entité je recupere un sectionDTO */
		public static SectionDTO mapEntityToDTO(Section section) {
			
			if(section == null) {
				return null;
			}
			
			return SectionDTO.builder()
					.id(section.getId())
					.SectionId(section.getSectionId())
					.name(section.getName())
					.description(section.getDescription())
					.tarif(section.getTarif())
					.build();
									
		}
	
		/* A partir d'un sectionDTO  je recupere une section entité */
		public  Section  mapDtoToEntity(long sectionDto) {
			boolean existSection = false;
			Section section = null ;
			if(sectionDto == 0) {return null;}
					
			if(sectionDto != 0) {
				existSection =	sectionRepo.existsById(sectionDto);
				section = sectionRepo.findById(sectionDto).get();
			}
								
			return section;
	}
	
		
}
