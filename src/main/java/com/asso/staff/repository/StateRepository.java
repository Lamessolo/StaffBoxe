package com.asso.staff.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.asso.staff.entity.State;

public interface StateRepository extends JpaRepository<State, Integer> {

	Optional<State> findStateById(int idState);
	List<State> findByCountryCode(@Param("code")String codeCountry);
}
