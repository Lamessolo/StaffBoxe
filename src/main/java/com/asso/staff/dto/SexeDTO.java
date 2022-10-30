package com.asso.staff.dto;
import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;

import com.asso.staff.entity.Sexe;
import com.asso.staff.repository.SexeRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SexeDTO implements Serializable {

	private long id;
	private String name;
	
}
