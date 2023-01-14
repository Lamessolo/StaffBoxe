package com.asso.staff.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.asso.staff.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByUserEmailOrderByDateCreatedDesc(@Param("email")String email);
}
