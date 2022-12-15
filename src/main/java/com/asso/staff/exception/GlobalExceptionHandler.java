package com.asso.staff.exception;

import com.asso.staff.error.ErrorDetails;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler{

	/* handle specific exceptions
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException exception
			,WebRequest webRequest){
		ErrorDetails errorDetails = new ErrorDetails(new Date()
				                                     ,exception.getMessage()
				                                     ,webRequest.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	*/
	
	public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			 HttpHeaders headers, HttpStatus status, WebRequest request){
		
		Map<String, String> errors = new HashMap<>();
		  ex.getBindingResult().getAllErrors().forEach((error)-> {
			  String fieldName = ((FieldError)error).getField();
			  String message = error.getDefaultMessage();
			  errors.put(fieldName, message);
			  
		  });
				return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);				
	}
		
}
