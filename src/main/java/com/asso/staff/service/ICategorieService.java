package com.asso.staff.service;

import java.util.List;
import java.util.Map;

import com.asso.staff.dto.CategorieDTO;

public interface ICategorieService {

	CategorieDTO createCategorie(CategorieDTO categorieDto);
	
	CategorieDTO  findCategorieById(Long id);
	
	List<CategorieDTO> getAllCategories();
	
	CategorieDTO updateCategorie(long id, CategorieDTO categorieDto);
	
	Map<String,Boolean> deleteCategorie(long categorieId);
}
