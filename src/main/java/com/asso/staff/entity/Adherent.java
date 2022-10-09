package com.asso.staff.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_adherent")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Adherent implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="adherent_id", unique=true)
	private String AdherentId;
	
	@Column(name="name")
	private String name;
	
	@Column(name="prenom")
	private String prenom;
	
	@Column(name="adresse")
	private String adresse;
	
	@Column(name="email")
	private String email;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="poid")
	private BigDecimal poid;
	
	@Column(name="statut")
	private String statut;
	
	
	@Column(name="date_created")
	@CreationTimestamp
	private Date dateCreated;
	
	@CreationTimestamp
	@Column(name="last_updated")
	private Date lastUpdate;
			
	@OneToOne (cascade = CascadeType.ALL)
	@JoinColumn(name="categorie_id", referencedColumnName="id")	
	private Categorie Categorie;
	
   /*	
	@ManyToMany
	@JoinTable(
	name="Roles_Adherents",
	joinColumns =@JoinColumn(name="adherents_id")
	,inverseJoinColumns =@JoinColumn(name="role_id"))
	private Set<Role> roles;
	*/
		
	@OneToOne (cascade = CascadeType.ALL)
	@JoinColumn(name="section_id", referencedColumnName="id")
	private Section section;
	
	
	@OneToOne (cascade = CascadeType.ALL)
	@JoinColumn(name="sexe_id", referencedColumnName="id")
	private Sexe sexe;

}
