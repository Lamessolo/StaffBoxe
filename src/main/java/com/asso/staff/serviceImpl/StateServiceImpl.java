package com.asso.staff.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.asso.staff.entity.State;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.CountryRepository;
import com.asso.staff.repository.StateRepository;
import com.asso.staff.service.IStateService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StateServiceImpl implements IStateService {

	
	private final StateRepository  stateRepository ;
	
	@Override
	public List<State> getAllState() {
		return stateRepository.findAll();
	}

	@Override
	public State getStateById(int idState) {
		return stateRepository.findStateById(idState).
		orElseThrow(()->new UserNotFoundException("State by id " + idState + "was not found"));
				
	}

	@Override
	public List<State> getStateByCountryCode(String codeCountry) {
		return stateRepository.findByCountryCode(codeCountry);
								
	}

}
