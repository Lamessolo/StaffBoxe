package com.asso.staff.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.dto.UserCreateDTO;
import com.asso.staff.dto.UserDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Categorie;
import com.asso.staff.entity.Section;
import com.asso.staff.entity.Sexe;
import com.asso.staff.entity.User;
import com.asso.staff.exception.ResourceNotFoundException;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.UserRepository;
import com.asso.staff.service.IUserService;
import com.asso.staff.utils.PageUserResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

	private final UserRepository  userRepository ;
	private final ModelMapper mapper;
	
	
	private UserDTO mapEntityToDTO(User user) {
		
		 UserDTO userDto = mapper.map(user, UserDTO.class);
	
		return userDto;			
	}
	
	public  User mapDtoToEntity(UserCreateDTO userCreateDto) {
	
			User newUser = mapper.map(userCreateDto, User.class);	
	     
		return newUser;
		
	}
	
	
	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PageUserResponse getAllUser(int pageNo, int pageSize, String sortBy) {
		PageRequest pegeable = PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
		Page<User> listeOfUser = userRepository.findAll(pegeable);
		List<User> users = listeOfUser.getContent();
		List<UserDTO> content = listeOfUser.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		
		PageUserResponse pageUserResponse = new PageUserResponse();
		pageUserResponse.setContent(content);
		pageUserResponse.setPageNo(listeOfUser.getNumber());
		pageUserResponse.setPageSize(listeOfUser.getSize());
		pageUserResponse.setTotalElements(listeOfUser.getTotalElements());
		pageUserResponse.setTotalPages(listeOfUser.getTotalPages());
		pageUserResponse.setLast(listeOfUser.isLast());
		return pageUserResponse;
	}

	@Override
	public Map<String,UserDTO> createUser(UserCreateDTO userCreateDto) {
		
		    if(EmailUserExist(userCreateDto.getEmail().toString())== true){
		    	// Je transforme l'UserDTO en entité nouvelle adherent
				User userNew = mapDtoToEntity(userCreateDto);														
				// Je sauve une entité dans la base
				   // addUser(userNew);
				userRepository.save(userNew);
				Map<String, UserDTO> response = new HashMap<>();
				response.put("user Created !", mapEntityToDTO(userNew));
				return response;
		    }else {
		    	 Map<String, UserDTO> response = new HashMap<>();
					response.put("user not Created, email existing !", null);
					return response;
		    }		      
	}

	@Override
	public List<UserDTO> findUserByName(String name) {
		List<User> findUserByName = userRepository.findByNameContaining(name);
		List<UserDTO> users = findUserByName.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return users;
	}

	@Override
	public List<UserDTO> SearchByNameOrEmail(String name) {
		List<User> searchUserByName = userRepository.SearchByNameOrEmail(name);
		List<UserDTO> users = searchUserByName.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return users;
	}

	@Override
	public UserDTO findUserById(Long id) {
		User entityUser = userRepository.findUserById(id)
				.orElseThrow(()->new UserNotFoundException("User by id " + id + "was not found"));
		return mapEntityToDTO(entityUser);
	}

	@Override
	public UserDTO updateUser(long userId, UserCreateDTO userCreateDto) {
		// Recuperer user entite by Id
				User user = userRepository.findById(userId)
						.orElseThrow(()-> new ResourceNotFoundException("User", "id", userId));
								
				user.setName(userCreateDto.getName());
				
				user.setEmail(userCreateDto.getEmail());
				
				user.setPhone(userCreateDto.getPhone());				
				
				User userUpdated = userRepository.save(user);
				
				return mapEntityToDTO(userUpdated);
	}

	@Override
	public Map<String, Boolean> deleteUser(long userId) {
		User entityUser = userRepository.findUserById(userId)
				.orElseThrow(()->new UserNotFoundException("User by id " + userId + "was not found"));
		userRepository.delete(entityUser);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}

	@Override
	public boolean EmailUserExist(String emailUser) {
		String emailExist ;
		boolean boolEmailExist;
		
		boolean findEmailUser = userRepository.findUserByEmail(emailUser).isPresent();						
		if(findEmailUser == true) {
			 emailExist = "cette email existe deja";
			 boolEmailExist = false;
		}
		else {
			 emailExist = "cette email n'existe pas"; 
			 boolEmailExist = true;
		}
		
		return boolEmailExist;
	}

}
