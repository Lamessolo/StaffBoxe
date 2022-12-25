package com.asso.staff.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tbl_section")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Section implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="sectionId",unique=true)
	private String SectionId;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="tarif")
	private BigDecimal tarif;
		
	@Column(name="imageUrl_Section")
	private String imageUrl;
	
	@Column(name="content")
	private String content;
	
	
}
