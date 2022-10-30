package com.asso.staff.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asso.staff.entity.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {

	Optional<Categorie> findCategorieById(long id);
}
