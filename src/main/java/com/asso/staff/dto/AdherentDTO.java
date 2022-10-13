package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Section;
import com.asso.staff.entity.Sexe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdherentDTO implements Serializable {

	private long id;
	private String AdherentId;
	private String name;
	private String prenom;
	private String adresse;			
	private String email;
	private String phone;
	private BigDecimal poid;
	private String statut;
	private String imageUrl;

 /*	private SectionDTO section;
	private CategorieDTO categorie;
	private SexeDTO sexe; */
	
	/*
	public static AdherentDTO mapEntityToDTO(Adherent adherent) {
		
		if(adherent ==null) {
			return null;
		}
		
		return AdherentDTO.builder()
				.id(adherent.getId())
				.AdherentId(adherent.getAdherentId())
				.name(adherent.getName())
				.prenom(adherent.getPrenom())				
				.adresse(adherent.getAdresse())
				.sexe(SexeDTO.mapEntityToDTO(adherent.getSexe()))
				.categorie(CategorieDTO.mapEntityToDTO(adherent.getCategorie()))
				.email(adherent.getEmail())
				.imageUrl(adherent.getImageUrl())
				.poid(adherent.getPoid())
				.statut(adherent.getStatut())
				.phone(adherent.getPhone())
				.section(SectionDTO.mapEntityToDTO(adherent.getSection())).build();
								
	}
	
		
	public Adherent mapDtoToEntity(AdherentDTO adherentDto) {
		
		if(adherentDto == null) {
			return null;
		}
		
		Adherent newAdherent = new Adherent();
		String newAdherentId = adherentDto.getName().toLowerCase() + "_" + adherentDto.getPrenom()+ "_Id";
		newAdherent.setAdherentId(newAdherentId);
		newAdherent.setName(adherentDto.getName());
		newAdherent.setPrenom(adherentDto.getPrenom());
		newAdherent.setImageUrl(adherentDto.getImageUrl());
		newAdherent.setPoid(adherentDto.getPoid());
		newAdherent.setStatut(adherentDto.getStatut());
		newAdherent.setAdresse(adherentDto.getAdresse());
		newAdherent.setPhone(adherentDto.getPhone());
		newAdherent.setEmail(adherentDto.getEmail());
		//newAdherent.setSection(Section.builder().id(adherentDto.getId()).build());
		// Section je veux recuperer l'id du SectionDTO regarder s'il entité section 
		//avec cette id existe et recuperer son nom
		//newAdherent.setSection(SectionDTO.mapDtoToEntity(adherentDto.getSection()));
				// Sexe
				// Categorie
		return newAdherent;
	}
	
	*/
	
	
}
