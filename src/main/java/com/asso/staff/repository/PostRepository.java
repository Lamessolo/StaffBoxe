package com.asso.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asso.staff.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	
}
