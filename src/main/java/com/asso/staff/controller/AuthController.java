package com.asso.staff.controller;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.UserCreateDTO;
import com.asso.staff.dto.UserDTO;
import com.asso.staff.serviceImpl.UserServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
@CrossOrigin
public class AuthController {


	private final UserServiceImpl userService;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(){
		
		return new ResponseEntity<String>("User is logged in ", HttpStatus.OK);
	}
	
	@PostMapping(value ={"/register"})
	public ResponseEntity<Map<String,UserDTO>> addUser(@Valid @RequestBody UserCreateDTO userCreateDto){
		
		Map<String,UserDTO> newUser = userService.createUser(userCreateDto);
		return new ResponseEntity<>(newUser, HttpStatus.CREATED);	
	}
}
