package com.asso.staff.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Section;
import com.asso.staff.repository.SectionRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SectionDTO implements Serializable {
	
	private long id;	
	private String SectionId;	
	private String description;
	private String name;
	private BigDecimal tarif;
	private String imageUrl;
	private String content;
	
}
