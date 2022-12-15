package com.asso.staff.utils;

import com.asso.staff.entity.DatabaseFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {

	private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;

   
}
