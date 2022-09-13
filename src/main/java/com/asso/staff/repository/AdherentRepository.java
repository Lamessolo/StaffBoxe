package com.asso.staff.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asso.staff.entity.Adherent;

public interface AdherentRepository extends JpaRepository<Adherent, Long> {

	void deleteAdherentById(Long id);
	Optional<Adherent> findAdherentById(Long id);
	
}
