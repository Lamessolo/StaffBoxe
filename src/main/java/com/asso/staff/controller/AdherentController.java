package com.asso.staff.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.repository.AdherentRepository;
import com.asso.staff.serviceImpl.AdherentServiceImpl;
import com.asso.staff.utils.PageAdherentResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/adherent")
@CrossOrigin
public class AdherentController {

	private final AdherentServiceImpl adherentService;
	
		
	@GetMapping("/all")
	public PageAdherentResponse getAllAdherents(
			@RequestParam(value="pageNo",defaultValue= "0",required=false) int pageNo,
			@RequestParam(value="pageSize",defaultValue= "10",required=false) int pageSize,
			@RequestParam(value="sortBy",defaultValue= "id",required=false) String sortBy){
		 
		return adherentService.getAllAdherent(pageNo,pageSize,sortBy);
		}
	
	@GetMapping("/section/{id}")
	public ResponseEntity<List<AdherentDTO>> getAdherentsBySection(@PathVariable("id") long id){
		List<AdherentDTO> adherentsBySection = adherentService.getAdherentBySectionId(id);
		return new ResponseEntity<>(adherentsBySection, HttpStatus.OK);
		}
	
	@GetMapping("/sexe/{id}")
	public ResponseEntity<List<AdherentDTO>> getAdherentsBySexe(@PathVariable("id") long id){
		List<AdherentDTO> adherentsBySexe = adherentService.getAdherentBySexeId(id);
		return new ResponseEntity<>(adherentsBySexe, HttpStatus.OK);
		}
	
	@GetMapping("/{id}")
	public ResponseEntity<AdherentDTO> getAdherentById(@PathVariable("id") long id){
		AdherentDTO adherent = adherentService.findAdherentById(id);
		return new ResponseEntity<>(adherent, HttpStatus.OK);
		}
	
	
	@GetMapping("/search/{name}")
	public ResponseEntity<List<AdherentDTO>> getAdherentByName(@PathVariable("name") String name){
		List<AdherentDTO> adherents = adherentService.findAdherentByName(name);
		return new ResponseEntity<>(adherents, HttpStatus.OK);
		}
	
	@PostMapping("/add")
	public ResponseEntity<AdherentDTO> addAdherent(@RequestBody AdherentCreateDTO adherentCreateDto){
		
		AdherentDTO newAdherent = adherentService.createAdherent(adherentCreateDto);
		return new ResponseEntity<>(newAdherent, HttpStatus.CREATED);	
	}
		
	@PutMapping("update/{id}")
	public ResponseEntity<AdherentDTO> updateAdherent(@PathVariable("id") long id,@RequestBody AdherentCreateDTO adherentCreateDto){
		AdherentDTO updatedAdherent =  adherentService.updateAdherent(id,adherentCreateDto);		 
		return new ResponseEntity<>(updatedAdherent,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteAdherent(@PathVariable("id") long id){
		 adherentService.deleteAdherent(id);
		 String adherentDeleted = "L'adherent: "+id+ ",a été supprimé";
		return new ResponseEntity<>(adherentDeleted,HttpStatus.OK);
		
	}
	
	
	
	
	
	
}
