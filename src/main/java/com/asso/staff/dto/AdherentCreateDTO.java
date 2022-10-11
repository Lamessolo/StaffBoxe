package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import com.asso.staff.entity.Adherent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdherentCreateDTO  implements Serializable{

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
 /*	private long section;
	private long categorie;
	private long sexe; */
	
	
	/* A partir d'unE entité adherent, je creer un AdherentCreateDTO qui va me permettre de creer un adherent 
	public static AdherentCreateDTO mapEntityToDTO(Adherent adherent) {
		
		if(adherent ==null) {
			return null;
		}
		
		return AdherentCreateDTO.builder()
				.id(adherent.getId())
				.AdherentId(adherent.getAdherentId())
				.name(adherent.getName())
				.prenom(adherent.getPrenom())				
				.adresse(adherent.getAdresse())
				
				
				.email(adherent.getEmail())
				.imageUrl(adherent.getImageUrl())
				.poid(adherent.getPoid())
				.statut(adherent.getStatut())
				.phone(adherent.getPhone())
				.sexe(adherent.getSexe().getId())
			    .categorie(adherent.getCategorie().getId())
				.section(adherent.getSection().getId()).build();
		       
	}*/


	/* A partir d'un  adherentCreateDTO, je crée une entité Adherent 
 public static Adherent mapDtoToEntity(AdherentCreateDTO adherentCreateDto) {
	 Adherent newAdherent = null ;
	if(adherentCreateDto == null) {
		return null;
	}
	
	if(adherentCreateDto.id == 0 ) {
		 newAdherent = new Adherent();
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
		
		
		    // Section
		newAdherent.setSection(SectionDTO.mapDtoToEntity(adherentCreateDto.getSection()));
				// Sexe
		newAdherent.setSexe(SexeDTO.mapDtoToEntity(adherentCreateDto.getSexe()));
			//	Categorie
		newAdherent.setCategorie(CategorieDTO.mapDtoToEntity(adherentCreateDto.getCategorie()));
			
	}
	return newAdherent;
}
	*/
}
