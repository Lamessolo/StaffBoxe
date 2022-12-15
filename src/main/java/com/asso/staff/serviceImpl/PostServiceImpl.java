package com.asso.staff.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.PostDTO;
import com.asso.staff.entity.Post;
import com.asso.staff.exception.ResourceNotFoundException;
import com.asso.staff.repository.PostRepository;
import com.asso.staff.service.IPostService;
import com.asso.staff.utils.PagePostResponse;


import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements IPostService {

	private final PostRepository postRepository;
	private final ModelMapper mapper;
	
	@Override
	    public PostDTO createPost(PostDTO postDto) {
		
			// Convert DTO => entity		
			Post post = mapDtoToEntity(postDto);			
			Post newPostCreated = postRepository.save(post);
			
			// Convert entity => DTO		
			PostDTO postResponse = mapEntityToDto(newPostCreated);		
			return postResponse;
		
	}
	
	// Convert  DTO vers entity
		private Post mapDtoToEntity (PostDTO postDto) {
		
		Post post = mapper.map(postDto,Post.class);
		
	/*	Post post = new Post();
		post.setTitle(postDto.getTitle());
		post.setDescription(postDto.getDescription());
		post.setContent(postDto.getContent());*/
		
		return post;
	}
		
		// Convert entity  vers DTO
		private PostDTO mapEntityToDto (Post post) {
			
			PostDTO postDto = mapper.map(post,PostDTO.class);
		/*	PostDto postDto = new PostDto();
			postDto.setId(post.getId());
			postDto.setTitle(post.getTitle());
			postDto.setDescription(post.getDescription());	
			postDto.setContent(post.getContent());*/
			
			return postDto;
		}


		@Override
		public PagePostResponse getAllPosts(int pageNo,int pageSize,String sortBy) {
				
				Pageable pageable = PageRequest.of(pageNo, pageSize,Sort.by(sortBy).descending());
				Page<Post> posts = postRepository.findAll(pageable);
				
				List<Post> listOfPosts = posts.getContent();
				
				
				// Chaque post de la base de données je convertis en DTO		
				List<PostDTO> content =  listOfPosts.stream().map(post -> mapEntityToDto(post)).collect(Collectors.toList());
				
				PagePostResponse pagePostResponse = new PagePostResponse();
				pagePostResponse.setContent(content);
				pagePostResponse.setPageNo(posts.getNumber());
				pagePostResponse.setPageSize(posts.getSize());
				pagePostResponse.setTotalElements(posts.getTotalElements());
				pagePostResponse.setTotalPages(posts.getTotalPages());
				pagePostResponse.setLast(posts.isLast());
				
				return pagePostResponse;
				
			}

		@Override
		public PostDTO getPostById(long postDtoId) {
			Post post = postRepository.findById(postDtoId)
					.orElseThrow(()->new ResourceNotFoundException("Post", "id", postDtoId));
			
			return mapEntityToDto(post);
		}

		@Override
		public PostDTO updatePost(PostDTO postDto, long id) {
			Post post = postRepository.findById(id)
					.orElseThrow(()->new ResourceNotFoundException("Post", "id", id));
			post.setTitre(postDto.getTitre());
			post.setDescription(postDto.getDescription());
		    post.setContent(postDto.getContent());
		    
		    Post updatedPost = postRepository.save(post);
		    
	         
			return mapEntityToDto(updatedPost);
		}

		@Override
		public void deletePostById(long id) {
			Post post = postRepository.findById(id)
					.orElseThrow(()->new ResourceNotFoundException("Post", "id", id));
			
			postRepository.delete(post);
			
		}

		
}
