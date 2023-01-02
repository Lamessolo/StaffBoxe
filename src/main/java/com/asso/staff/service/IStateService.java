package com.asso.staff.service;

import java.util.List;
import java.util.Optional;

import com.asso.staff.entity.State;

public interface IStateService {

	List<State> getAllState ();
	State getStateById(int idState);
	List<State> getStateByCountryCode(String codeCountry);
	
}
