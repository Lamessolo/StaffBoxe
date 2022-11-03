package com.asso.staff.serviceImpl;



import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.CategorieDTO;
import com.asso.staff.entity.Categorie;
import com.asso.staff.exception.ResourceNotFoundException;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.CategorieRepository;
import com.asso.staff.service.ICategorieService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategorieServiceImpl implements ICategorieService {

	private final CategorieRepository categorieRepository;	
	private final ModelMapper mapper;
	
	public CategorieDTO mapEntityToDTO(Categorie categorie) {		
		CategorieDTO categorieDto = mapper.map(categorie, CategorieDTO.class);	
		    return categorieDto;			
	}
		
	public  Categorie mapDtoToEntity(CategorieDTO categorieDto){
		
		Categorie newCategorie = mapper.map(categorieDto, Categorie.class);	 
	return newCategorie;
	
	}
	
	@Override
	public CategorieDTO createCategorie(CategorieDTO categorieDto) {
		// Je transforme le SexeDTO en une nouvelle entité Sexe
				Categorie categorieNew = mapDtoToEntity(categorieDto);		
			    categorieRepository.save(categorieNew);
			    //Je revenvoi le DTO 
			    return mapEntityToDTO(categorieNew);
	}
	@Override
	public CategorieDTO findCategorieById(Long id) {
		Categorie entityCategorie = categorieRepository.findCategorieById(id)
				.orElseThrow(()->new UserNotFoundException("Categorie by id " + id + "was not found"));
		return mapEntityToDTO(entityCategorie);
	}
	@Override
	public List<CategorieDTO> getAllCategories() {
		List<Categorie> listeCategorie = categorieRepository.findAll();
		List<CategorieDTO> listeCategorieDto = listeCategorie.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		return listeCategorieDto;
	}

	@Override
	public CategorieDTO updateCategorie(long categorieId, CategorieDTO categorieDto) {
		// Recuperer le sexe entite by Id
				Categorie categorie = categorieRepository.findById(categorieId)
						.orElseThrow(()-> new ResourceNotFoundException("Categorie","id", categorieId));
				categorie.setName(categorieDto.getName());	
				categorie.setDescription(categorieDto.getDescription());
				Categorie categorieUpdated = categorieRepository.save(categorie);
				
				return mapEntityToDTO(categorieUpdated);
	}

	@Override
	public Map<String, Boolean> deleteCategorie(long categorieId) {
		// TODO Auto-generated method stub
		return null;
	}
}
