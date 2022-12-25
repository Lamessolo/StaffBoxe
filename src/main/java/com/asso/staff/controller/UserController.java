package com.asso.staff.controller;

import java.util.Map;

import javax.validation.Valid;

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

import com.asso.staff.dto.UserCreateDTO;
import com.asso.staff.dto.UserDTO;
import com.asso.staff.serviceImpl.UserServiceImpl;
import com.asso.staff.utils.ConstanteAppForUser;
import com.asso.staff.utils.PageUserResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

	private final UserServiceImpl userService;
	
	
	@GetMapping
	public PageUserResponse getAllUsers(
			@RequestParam(value="pageNo",defaultValue= ConstanteAppForUser.DEFAULT_PAGE_NUMEBR,required=false) int pageNo,
			@RequestParam(value="pageSize",defaultValue= ConstanteAppForUser.DEFAULT_PAGE_SIZE,required=false) int pageSize,
			@RequestParam(value="sortBy",defaultValue= ConstanteAppForUser.DEFAULT_SORT_BY,required=false) String sortBy){
		 
		return userService.getAllUser(pageNo,pageSize,sortBy);
		}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable("id") long id){
		UserDTO user = userService.findUserById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
		}
	
	@PostMapping(value ={"/add"})
	public ResponseEntity<Map<String,UserDTO>> addUser(@Valid @RequestBody UserCreateDTO userCreateDto){
		
		Map<String,UserDTO> newUser = userService.createUser(userCreateDto);
		return new ResponseEntity<>(newUser, HttpStatus.CREATED);	
	}
		
	@PutMapping("update/{id}")
	public ResponseEntity<UserDTO> updateAdherent(@Valid @PathVariable("id") long id,@RequestBody UserCreateDTO userCreateDto){
		UserDTO updatedUser =  userService.updateUser(id,userCreateDto);		 
		return new ResponseEntity<>(updatedUser,HttpStatus.OK);
		
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable("id") long userId){
		
		return new ResponseEntity<>(userService.deleteUser(userId), HttpStatus.OK);
	}
	
}
