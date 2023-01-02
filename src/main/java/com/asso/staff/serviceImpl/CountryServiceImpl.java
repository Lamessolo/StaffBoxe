package com.asso.staff.serviceImpl;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.asso.staff.entity.Country;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.CountryRepository;
import com.asso.staff.service.ICountryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements ICountryService{

	private final CountryRepository countryRepository ;
	

	@Override
	public List<Country> getAllCountry() {
		
		return countryRepository.findAll();
	}

	@Override
	public Country getCountryById(int idCountry) {
		
		return countryRepository.findCountryById(idCountry).
				orElseThrow(()->new UserNotFoundException("Country by id " + idCountry + "was not found"));
	}
}
