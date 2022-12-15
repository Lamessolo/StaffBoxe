package com.asso.staff.serviceImpl;

import java.io.IOException;


import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.asso.staff.entity.DatabaseFile;
import com.asso.staff.exception.FileStorageException;
import com.asso.staff.exception.FileNotFoundException;

import com.asso.staff.repository.DatabaseFileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DatabaseFileService {

	
    private final DatabaseFileRepository dbFileRepository;

    public DatabaseFile storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DatabaseFile dbFile = new DatabaseFile(fileName, file.getContentType(), file.getBytes());

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
    
    public DatabaseFile getFile(String fileId) 
    {
    	DatabaseFile databasefile = dbFileRepository.findById(fileId)
    			.orElseThrow(()-> new FileNotFoundException("File not found with id " + fileId));
		return databasefile;
				         
    }
}
