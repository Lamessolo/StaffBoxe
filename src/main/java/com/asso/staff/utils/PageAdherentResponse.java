package com.asso.staff.utils;

import java.util.List;

import com.asso.staff.dto.AdherentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageAdherentResponse {

	private List<AdherentDTO> content;
	private int pageNo;
	private int pageSize;
	private long totalElements;
	private int totalPages;
	private boolean last;
}
