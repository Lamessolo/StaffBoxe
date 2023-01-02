package com.asso.staff.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.entity.Country;
import com.asso.staff.serviceImpl.CountryServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/country")
@CrossOrigin
public class CountryController {

	private final CountryServiceImpl countryService;
		
	@GetMapping	
	public List<Country> getAllCountry() {
		
		return countryService.getAllCountry();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Country> getCountryById(@PathVariable("id") int idCountry){
		Country country = countryService.getCountryById(idCountry);
		return new ResponseEntity<>(country, HttpStatus.OK);
		}
}
