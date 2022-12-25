package com.asso.staff.service;

import java.util.List;
import java.util.Map;

import com.asso.staff.dto.UserCreateDTO;
import com.asso.staff.dto.UserDTO;
import com.asso.staff.entity.User;
import com.asso.staff.utils.PageUserResponse;


public interface IUserService {
	
    User addUser(User user);
	
	PageUserResponse getAllUser(int pageNo,int pageSize,String sortBy);
	
	Map<String,UserDTO> createUser(UserCreateDTO userCreateDto) ;
		
	List<UserDTO> findUserByName(String name);
	
	List<UserDTO> SearchByNameOrEmail(String name);
	
	UserDTO findUserById(Long id);
	
	UserDTO updateUser (long userId, UserCreateDTO userCreateDto);
	
	Map<String,Boolean> deleteUser(long userId);
	
	boolean EmailUserExist(String emailUser);
	
	
}
