package com.asso.staff.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.entity.Country;
import com.asso.staff.entity.State;
import com.asso.staff.serviceImpl.CountryServiceImpl;
import com.asso.staff.serviceImpl.StateServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/state")
@CrossOrigin
public class StateController {

private final StateServiceImpl stateService;
	
	
	@GetMapping	
	public List<State> getAllState() {
		
		return stateService.getAllState();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<State> getStateById(@PathVariable("id") int idState){
		State state = stateService.getStateById(idState);
		return new ResponseEntity<>(state, HttpStatus.OK);
		}
	
	@GetMapping("search/{code}")
	public ResponseEntity<List<State>> getStateByCountryCode(@PathVariable("code") String codeCountry){
		List<State> statesforCountry = stateService.getStateByCountryCode(codeCountry);
		return new ResponseEntity<>(statesforCountry, HttpStatus.OK);
		}
	
	
}
