package com.asso.staff.service;

import java.util.List;

import com.asso.staff.entity.Country;

public interface ICountryService {

	List<Country> getAllCountry ();
	Country getCountryById(int idCountry);
}
