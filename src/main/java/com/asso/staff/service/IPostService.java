package com.asso.staff.service;


import com.asso.staff.dto.PostDTO;
import com.asso.staff.utils.PagePostResponse;

public interface IPostService {

	PostDTO createPost(PostDTO postDto);
	PagePostResponse getAllPosts(int pageNo,int pageSize,String sortBy);
	PostDTO getPostById (long postDtoId);
	PostDTO updatePost(PostDTO postDto, long id);
	void  deletePostById (long id);
}
