package com.asso.staff.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.asso.staff.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

	Optional<User> findUserById(Long id);
	User findUserByEmail(String emailUser);
	List<User> findByNameContaining(@Param("name")String name);
	
	@Query("SELECT a FROM User a WHERE " 
			+ "a.name LIKE CONCAT ('%',:name,'%')"
		    + " OR a.email LIKE CONCAT ('%', :name,'%')")
			List<User> SearchByNameOrEmail(@Param("name")String name);
						
	@Query(value= "SELECT * FROM tbl_user a WHERE " 
			+ " a.name LIKE CONCAT ('%',:name,'%')"
			+ " OR a.email LIKE CONCAT ('%', :name,'%')", nativeQuery = true)
			List<User> SearchByNameOrEmailSQL(@Param("name")String name);
}
