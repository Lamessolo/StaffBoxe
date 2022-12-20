package com.asso.staff.serviceImpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.asso.staff.entity.Adherent;
import com.asso.staff.exception.UserNotFoundException;
import com.asso.staff.repository.AdherentRepository;
import com.asso.staff.repository.CategorieRepository;
import com.asso.staff.repository.SectionRepository;
import com.asso.staff.repository.SexeRepository;
import com.asso.staff.service.IFileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements IFileService {

	private final AdherentRepository adherentRepository;
	
	@Override
	public String uploadImage(String path, MultipartFile file,long id) throws IOException {

       // File name  abc.png
		String name = file.getOriginalFilename();
		
		Adherent AdherentIdToFind = adherentRepository.findAdherentById(id)
				.orElseThrow(()->new UserNotFoundException("Adherent by id " + id + "was not found"));
		
		
		
		//random name generate file
		//String randomID = UUID.randomUUID().toString();
	//	au nouveau random on ajoute le '.jpg' ou '.jpeg' ou ...
		//String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));
			
		//FullPath
		
		String filePath = path + File.separator + name;
		
		// dans Adherent je veux changer l'imageUrl , pour cela jai besoin d'un AdherentId
					
		// Create folder if not created
		
		File f = new File(path);
		if(!f.exists()) {
			f.mkdir();
		}
		
		
		String phrase = "FrondEndAngular/staffBoxe/src/";
		 
		// forme une chaîne du début de phrase[0] jusqu'à phrase[TAILLE_MAX - 1]
		String imageUrl = filePath.substring(phrase.length());
		 	
		//file copy
		if(AdherentIdToFind.getImageUrl()!= "") {
			 AdherentIdToFind.setImageUrl(imageUrl);
			 
	   Adherent adherentUpdated = adherentRepository.save(AdherentIdToFind);	
		}
				 		
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		return imageUrl;
	}
	
	
	

	
}
