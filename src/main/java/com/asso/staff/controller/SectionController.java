package com.asso.staff.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.SectionDTO;

import com.asso.staff.serviceImpl.SectionServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/section")
@CrossOrigin
public class SectionController {

	private final SectionServiceImpl sectionService;
	
	@GetMapping
	public ResponseEntity<List<SectionDTO>> getAllSections(){
		List<SectionDTO> sections = sectionService.getAllSection();
		return new ResponseEntity<>(sections, HttpStatus.OK);
		}
	
	@GetMapping("/{id}")
	public ResponseEntity<SectionDTO> getSectionsById(@PathVariable("id") Long id){
		SectionDTO SectionById = sectionService.findSectionById(id);
		return new ResponseEntity<>(SectionById, HttpStatus.OK);
		}
	
	@PutMapping("update/{id}")
	public ResponseEntity<SectionDTO> updateSection(@Valid @PathVariable("id") long id,@RequestBody SectionDTO sectionDto){
		SectionDTO updatedSection =  sectionService.updateSection(id,sectionDto);		 
		return new ResponseEntity<>(updatedSection,HttpStatus.OK);
		
	}
	
	
	
}
