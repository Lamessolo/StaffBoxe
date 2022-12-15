package com.asso.staff.serviceImpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.asso.staff.service.IFileService;

@Service
public class FileServiceImpl implements IFileService {

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException {

       // File name  abc.png
		String name = file.getOriginalFilename();
		
		//random name generate file
		String randomID = UUID.randomUUID().toString();
		String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));
			
		//FullPath
		
		String filePath = path + File.separator + fileName1;
		
		
		// Create folder if not created
		
		File f = new File(path);
		if(!f.exists()) {
			f.mkdir();
		}
		
		//file copy
		
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		return name;
	}

	
}
