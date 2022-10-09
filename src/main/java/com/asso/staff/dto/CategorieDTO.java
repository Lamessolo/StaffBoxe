package com.asso.staff.dto;
import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;

import com.asso.staff.entity.Categorie;
import com.asso.staff.repository.CategorieRepository;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategorieDTO implements Serializable{

	@Autowired
	private static CategorieRepository categorieRepo;
	
	private long id;
	private String name;
	private String description;
	
	
public static CategorieDTO mapEntityToDTO(Categorie categorie) {
		
		if(categorie == null) {
			return null;
		}
		// Mappping  Section ==> SectionDTO
		return CategorieDTO.builder()
				.id(categorie.getId())
				.name(categorie.getName())
				.description(categorie.getDescription())
				.build();
								
	}

	public static Categorie mapDtoToEntity(long categorieDto) {
			Categorie newCategorie = null;
			
			if(categorieDto == 0) {
				return null;
			}
			
			if(categorieDto != 0 ) {
				newCategorie = categorieRepo.findById(categorieDto).get();	
				
				}
		
			return newCategorie;
}

	
	
	
}
