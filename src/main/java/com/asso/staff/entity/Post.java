package com.asso.staff.entity;

import java.math.BigDecimal;
import java.sql.Date;

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
@Table(name="tbl_post")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Post {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="titre", nullable = false)
	private String titre;
	
	@Column(name="description")
	private String description;
	
	@Column(name="date_publication")
	private Date publicationDate;
	
	@Column(name="content")
	private String content;
	
	@Column(name="image_post_url")
	private String imagePostUrl;
}
