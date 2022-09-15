package com.asso.staff.entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_adherent")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Adherent implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(unique=true)
	private String AdherentId;
	private String name;
	private String prenom;
	private String adresse;
	
	
	private String federation;
	
	
	@ManyToMany
	@JoinTable(
	name="Roles_Adherents",
	joinColumns =@JoinColumn(name="adherents_id")
	,inverseJoinColumns =@JoinColumn(name="role_id"))
	private Set<Role> roles;
	
	private String email;
	
	
	@OneToOne (cascade = CascadeType.ALL)
	@JoinColumn(name="section_id", referencedColumnName="id")
	private Section section;
	
	private String phone;
	private String imageUrl;
	
	
	@OneToOne (cascade = CascadeType.ALL)
	@JoinColumn(name="sexe_id", referencedColumnName="id")
	private Sexe sexe;
}
