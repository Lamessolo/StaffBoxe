package com.asso.staff.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDTO implements Serializable {

	private long id;
	
	// Le tritre ne peut pas etre null
	@NotEmpty
	@Size(min=2, message="Post title should have at least 2 characters")
    private String titre;
		
	@NotEmpty
	@Size(min = 10, message="Post title should have at least 10 characters")
	private String description;
	
	
	private Date publicationDate;
	
	@NotEmpty
	private String content;
	
	private String imagePostUrl;
}
