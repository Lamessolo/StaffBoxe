package com.asso.staff.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.entity.DatabaseFile;
import com.asso.staff.serviceImpl.DatabaseFileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
@CrossOrigin
public class FileDownloadController {

	    private final DatabaseFileService fileStorageService;

	    @GetMapping("/downloadFile/{fileName:.+}")
	    public ResponseEntity <Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
	        // Load file as Resource
	        DatabaseFile databaseFile = fileStorageService.getFile(fileName);

	        return ResponseEntity.ok()
	            .contentType(MediaType.parseMediaType(databaseFile.getFileType()))
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + databaseFile.getFileName() + "\"")
	            .body(new ByteArrayResource(databaseFile.getData()));
	    }
}
