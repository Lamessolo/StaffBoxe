package com.asso.staff.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserCreateDTO {

    private long id;
	
	private String name;
		
	private String email;
	
	private String Phone;
}
