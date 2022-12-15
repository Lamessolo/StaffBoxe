package com.asso.staff.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.asso.staff.utils.Response;
import com.asso.staff.entity.DatabaseFile;
import com.asso.staff.serviceImpl.AdherentServiceImpl;
import com.asso.staff.serviceImpl.DatabaseFileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
@CrossOrigin
public class FileUploadController {

	 
	    private final DatabaseFileService fileStorageService;

	    @PostMapping("/uploadFile")
	    public Response uploadFile(@RequestParam("file") MultipartFile file) {
	        DatabaseFile fileName = fileStorageService.storeFile(file);

	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	            .path("/downloadFile/")
	            .path(fileName.getFileName())
	            .toUriString();

	        return new Response(fileName.getFileName(), fileDownloadUri,
	            file.getContentType(), file.getSize());
	    }
	    
	    @PostMapping("/uploadMultipleFiles")
	    public List <Response> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
	        return Arrays.asList(files)
	            .stream()
	            .map(file -> uploadFile(file))
	            .collect(Collectors.toList());
	    }  
	    
	    
}
