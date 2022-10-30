package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;

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
	private Date dateNaissance;
	private BigDecimal poid;
	private String statut;
	private String imageUrl;
 	private long section;
	private long categorie;
	private long sexe; 
	
}
