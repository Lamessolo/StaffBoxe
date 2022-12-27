package com.asso.staff.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


import com.asso.staff.dto.SectionDTO;
import com.asso.staff.entity.Section;
import com.asso.staff.exception.ResourceNotFoundException;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.SectionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SectionServiceImpl {

	private final SectionRepository sectionRepo;
	private final ModelMapper mapper;
	
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
		
	 /* A partir d'une section entité je recupere un sectionDTO 
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
		*/
	
	/* A partir d'un sectionDTO  je recupere une section entité 
	 public  Section  mapDtoToEntity(long sectionDto) {
			boolean existSection = false;
			Section section = null ;
			if(sectionDto == 0) {return null;}
					
			if(sectionDto != 0) {
				existSection =	sectionRepo.existsById(sectionDto);
				section = sectionRepo.findById(sectionDto).get();
			}
								
			return section;
	}*/
	 
	 public SectionDTO updateSection(long sectionId, SectionDTO sectionDto) {
			
					Section section = sectionRepo.findById(sectionId)
							.orElseThrow(()-> new ResourceNotFoundException("Section","sectionId", sectionId));
					section.setName(sectionDto.getName());	
					section.setSectionId(sectionDto.getSectionId());
					section.setDescription(sectionDto.getDescription());
					section.setContent(sectionDto.getContent());
					section.setImageUrl(sectionDto.getImageUrl());
					section.setTarif(sectionDto.getTarif());				
					Section sectionUpdated = sectionRepo.save(section);
					
					
					return mapEntityToDTO(sectionUpdated);
		}
	
	 private SectionDTO mapEntityToDTO(Section section) {
			
		 SectionDTO sectionDto = mapper.map(section, SectionDTO.class);
	
		return sectionDto;			
	}
	
	public  Section mapDtoToEntity(SectionDTO sectionDto) {
	
			Section newSection = mapper.map(sectionDto, Section.class);	
	     
		return newSection;
		
	}
	 
	 
}
