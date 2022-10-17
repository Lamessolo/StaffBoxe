package com.asso.staff.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;


import com.asso.staff.entity.Adherent;

public interface AdherentRepository extends JpaRepository<Adherent, Long> {

	Optional<Adherent> findAdherentById(Long id);
	List<Adherent> findBySectionId(@Param("id") long id);
	List<Adherent> findBySexeId(@Param("id") long id);		
	List<Adherent> findByNameContaining(@Param("name")String name);
	  
	 
}
