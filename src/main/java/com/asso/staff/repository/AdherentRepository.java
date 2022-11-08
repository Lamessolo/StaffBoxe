package com.asso.staff.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.asso.staff.entity.Adherent;


 public interface AdherentRepository extends JpaRepository<Adherent, Long> {

	Optional<Adherent> findAdherentById(Long id);
	List<Adherent> findBySectionId(@Param("id") long id);
	List<Adherent> findBySexeId(@Param("id") long id);		
	List<Adherent> findByNameContaining(@Param("name")String name);
	
	@Query("SELECT a FROM Adherent a  WHERE " 
	+ "a.name LIKE CONCAT ('%',:name,'%')"
    + " OR a.prenom LIKE CONCAT ('%', :name,'%')")
	List<Adherent> SearchByNameOrPrenom(@Param("name")String name);
	
	
	@Query(value= "SELECT * FROM tbl_adherent a  WHERE " 
	+ " a.name LIKE CONCAT ('%',:name,'%')"
	+ " OR a.prenom LIKE CONCAT ('%', :name,'%')", nativeQuery = true)
	List<Adherent> SearchByNameOrPrenomSQL(@Param("name")String name);
	
	  
	 
}
