package com.asso.staff.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.entity.Adherent;
import com.asso.staff.repository.AdherentRepository;
import com.asso.staff.service.AdherentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/adherent")
@CrossOrigin("*")
public class AdherentController {

	private final AdherentService adherentService;
	
	
	@GetMapping("/all")
	public ResponseEntity<List<Adherent>> getAllAdherents(){
		List<Adherent> adherents = adherentService.getAllAdherent();
		return new ResponseEntity<>(adherents, HttpStatus.OK);
		}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Adherent> getAdherentById(@PathVariable("id") Long id){
		Adherent adherent = adherentService.findAdherentById(id);
		return new ResponseEntity<>(adherent, HttpStatus.OK);
		}
	
	@PostMapping("/add")
	public ResponseEntity<Adherent> addAdherent(@RequestBody Adherent adherent){
		Adherent newAdherent = adherentService.addAdherent(adherent);
		return new ResponseEntity<>(newAdherent, HttpStatus.CREATED);	
	}
	
	@PutMapping("/update")
	public ResponseEntity<Adherent> updateAdherent(@RequestBody Adherent adherent){
		Adherent updateAdherent = adherentService.updateAdherent(adherent);
		return new ResponseEntity<>(updateAdherent, HttpStatus.OK);
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteAdherent(@PathVariable("id") Long id){
		 adherentService.deleteAdherent(id);
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	
	
	
	
	
}
