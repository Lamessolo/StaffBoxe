package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Section;
import com.asso.staff.repository.SectionRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SectionDTO implements Serializable {

	
	private long id;	
	private String SectionId;	
	private String description;
	private String name;
	private BigDecimal tarif;
	
	
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
	public static Section  mapDtoToEntity(long sectionDto) {
		boolean existSection = false;
		Section section = null ;
		if(sectionDto == 0) {return null;}
				
		if(sectionDto != 0) {
			existSection =	sectionRepo.existsById(sectionDto);
			section = sectionRepo.findById(sectionDto).get();
		}
							
		return section;
}
*/
}
