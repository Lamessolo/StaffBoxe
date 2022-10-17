package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
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
	private Date dateNaissance;
	private String imageUrl;
 	private SectionDTO section;
	private CategorieDTO categorie;
	private SexeDTO sexe;
	
	
}
