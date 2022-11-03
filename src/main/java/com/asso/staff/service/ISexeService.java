package com.asso.staff.service;

import java.util.List;
import java.util.Map;

import com.asso.staff.dto.SexeDTO;

public interface ISexeService {

	SexeDTO createSexe(SexeDTO sexeDto);
	List<SexeDTO> getAllSexe();
	SexeDTO findSexeById(Long id);
	SexeDTO updateSexe(long SexeId, SexeDTO sexeDto);
	Map<String,Boolean> deleteSexe(long sexeId);
	
}
