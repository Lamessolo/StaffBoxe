package com.asso.staff.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.asso.staff.dto.OrderDTO;
import com.asso.staff.serviceImpl.OrderServiceImpl;
import com.asso.staff.utils.ConstanteAppForOrder;
import com.asso.staff.utils.PageOrderResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/order")
@CrossOrigin
public class OrderController {

	private final OrderServiceImpl orderService;
	
	@GetMapping	
	public PageOrderResponse getAllOrder(
			@RequestParam(value="pageNo",defaultValue= ConstanteAppForOrder.DEFAULT_PAGE_NUMEBR,required=false) int pageNo,
			@RequestParam(value="pageSize",defaultValue= ConstanteAppForOrder.DEFAULT_PAGE_SIZE,required=false) int pageSize,
			@RequestParam(value="sortBy",defaultValue= ConstanteAppForOrder.DEFAULT_SORT_BY,required=false) String sortBy){
		 
		return orderService.getAllOrder(pageNo,pageSize,sortBy);
		}
	
	@GetMapping("/userEmail/{email}")
	public ResponseEntity<List<OrderDTO>> getOrderByUserEmail(@PathVariable("email") String userEmail){
		List<OrderDTO> userEmailOrders = orderService.findOrderByUserEmail(userEmail);
		return new ResponseEntity<>(userEmailOrders, HttpStatus.OK);
		}
	
}
