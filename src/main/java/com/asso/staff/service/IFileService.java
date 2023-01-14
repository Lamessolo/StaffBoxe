package com.asso.staff.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface IFileService {

	String uploadImage(String path, MultipartFile file,long id ) throws IOException;
	String uploadImageSansId(String path, MultipartFile file ) throws IOException;
}
