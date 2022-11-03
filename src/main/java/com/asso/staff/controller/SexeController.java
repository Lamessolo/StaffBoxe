package com.asso.staff.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.dto.SexeDTO;
import com.asso.staff.serviceImpl.SexeServiceImpl;


import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/sexe")
@CrossOrigin
public class SexeController {

	
	private final SexeServiceImpl sexeService;
	
	
	@PostMapping("/add")
	public ResponseEntity<SexeDTO> createSexe(@RequestBody SexeDTO sexeDto){
		
		SexeDTO newSexe = sexeService.createSexe(sexeDto);
		return new ResponseEntity<>(newSexe, HttpStatus.CREATED);	
	}
	
	@GetMapping("/all")
	public List<SexeDTO> getAllSexes(){	
	return sexeService.getAllSexe();	
	}
	
	@GetMapping("/{id}")	
	public ResponseEntity<SexeDTO> getSexeById(@PathVariable("id")long id) {	
		SexeDTO SexeDto = sexeService.findSexeById(id);
		return new ResponseEntity<>(SexeDto, HttpStatus.OK);
	}
	
	@PutMapping("/update/{id}")	
	public ResponseEntity<SexeDTO> updateSexe (@PathVariable("id") long sexeId,@RequestBody SexeDTO sexeDto){
		SexeDTO updatedSexe =  sexeService.updateSexe(sexeId,sexeDto);	
		return new ResponseEntity<>(updatedSexe,HttpStatus.OK);
	}
	
	
	
}
