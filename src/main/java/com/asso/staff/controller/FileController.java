package com.asso.staff.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.asso.staff.serviceImpl.FileServiceImpl;
import com.asso.staff.utils.FileResponse;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/file")
@CrossOrigin
public class FileController {
	
	private final FileServiceImpl fileService;

	@Value("${project.image}")
	private String path;
	
	/*@PostMapping("/upload")
	public ResponseEntity<FileResponse> fileUpload(@RequestParam("image") MultipartFile image){
		String fileName;
		try {
			fileName = this.fileService.uploadImage(path, image);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<>(new FileResponse(null,"Image is not uploaded due to error on server!!"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(new FileResponse(fileName,"Image is successfully uploaded!!"), HttpStatus.OK);
		
	}
	*/
	@PostMapping("/upload/{id}")
	public ResponseEntity<FileResponse> fileUpload(@PathVariable("id")long id, MultipartFile image){
		String fileName;
		try {
			fileName = this.fileService.uploadImage(path, image, id);			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<>(new FileResponse(null,"Image is not uploaded due to error on server!!"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(new FileResponse(fileName,"Image is successfully uploaded!!"), HttpStatus.OK);
		
	}
	
}
