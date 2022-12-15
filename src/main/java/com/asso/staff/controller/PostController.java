package com.asso.staff.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asso.staff.dto.PostDTO;
import com.asso.staff.serviceImpl.PostServiceImpl;
import com.asso.staff.utils.PagePostResponse;
import com.asso.staff.utils.ConstanteApp;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/post")
@CrossOrigin
public class PostController {

	private final PostServiceImpl postService;
	
	//Create Post
	
		@PostMapping
		public ResponseEntity<PostDTO> createPost(@Valid @RequestBody PostDTO postDto){
			return new ResponseEntity<>(postService.createPost(postDto), HttpStatus.CREATED);
		}
		
		@GetMapping	
		public PagePostResponse getAllPosts(
				@RequestParam(value="pageNo",defaultValue = ConstanteApp.DEFAULT_PAGE_NUMEBR, required=false) int pageNo,
				@RequestParam(value="pageSize", defaultValue = ConstanteApp.DEFAULT_PAGE_SIZE, required=false)int pageSize,
				@RequestParam(value="sortBy", defaultValue = ConstanteApp.DEFAULT_SORT_BY, required=false)String sortBy
				
				){
			return postService.getAllPosts(pageNo,pageSize,sortBy);
			}	
		
		@GetMapping("/{id}")
		public ResponseEntity<PostDTO> getPostById(@PathVariable(name="id") long id){
			return ResponseEntity.ok(postService.getPostById(id));
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<PostDTO> updatePost(@Valid @RequestBody PostDTO postDto, @PathVariable(name="id")long id){
			PostDTO postReponse = postService.updatePost(postDto, id);
			return new ResponseEntity<>(postReponse, HttpStatus.OK);
		}
		
		@DeleteMapping("/{id}")
		public ResponseEntity<String> deletePost(@PathVariable(name="id") long id){
			
			postService.deletePostById(id);
			return new ResponseEntity<>("Post entity deleted successfully", HttpStatus.OK);
		}
		
}
