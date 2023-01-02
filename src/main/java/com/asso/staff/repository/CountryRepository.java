package com.asso.staff.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asso.staff.entity.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {

	Optional<Country> findCountryById(int idCountry);
	
}
