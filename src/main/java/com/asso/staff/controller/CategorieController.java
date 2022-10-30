package com.asso.staff.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.CategorieDTO;
import com.asso.staff.dto.SexeDTO;
import com.asso.staff.repository.CategorieRepository;
import com.asso.staff.serviceImpl.CategorieServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/categorie")
public class CategorieController {

	private final CategorieServiceImpl categorieService;
	
	
	@PostMapping("/add")
	public ResponseEntity<CategorieDTO> createCategorie(@RequestBody CategorieDTO categorieDto){
		
		CategorieDTO newCategorie = categorieService.createCategorie(categorieDto);
		return new ResponseEntity<>(newCategorie, HttpStatus.CREATED);	
	}
	
	@GetMapping("/all")
	public List<CategorieDTO> getAllCategories(){	
	return categorieService.getAllCategories();	
	}
	
	@GetMapping("/{id}")	
	public ResponseEntity<CategorieDTO> getCategorieById(@PathVariable("id")long id) {	
		CategorieDTO categorieDTO = categorieService.findCategorieById(id);
		return new ResponseEntity<>(categorieDTO, HttpStatus.OK);
	}
	
	@PutMapping("/update/{id}")	
	public ResponseEntity<CategorieDTO> updateCategorie (@PathVariable("id") long categorieId,@RequestBody CategorieDTO categorieDto){
		CategorieDTO updatedCategorie =  categorieService.updateCategorie(categorieId,categorieDto);	
		return new ResponseEntity<>(updatedCategorie,HttpStatus.OK);
	}
	
	
	
}
