package com.asso.staff.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	private String Sexe;
	private String email;
	private String section;
	private String phone;
	private String imageUrl;
	
	
}
