package com.asso.staff.serviceImpl;


import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.asso.staff.dto.AdherentCreateDTO;
import com.asso.staff.dto.AdherentDTO;
import com.asso.staff.dto.OrderDTO;
import com.asso.staff.entity.Adherent;
import com.asso.staff.entity.Order;
import com.asso.staff.repository.OrderRepository;
import com.asso.staff.utils.PageAdherentResponse;
import com.asso.staff.utils.PageOrderResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl {

	private final OrderRepository orderRepository;
	private final ModelMapper mapper;
	
public PageOrderResponse getAllOrder(int pageNo,int pageSize,String sortBy){
		
		PageRequest pegeable = PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
		Page<Order> listeOfOrder = orderRepository.findAll(pegeable);
		List<Order> orders = listeOfOrder.getContent();
		
		List<OrderDTO> content = orders.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
		
		PageOrderResponse pageOrderResponse = new PageOrderResponse();
		pageOrderResponse.setContent(content);
		pageOrderResponse.setPageNo(listeOfOrder.getNumber());
		pageOrderResponse.setPageSize(listeOfOrder.getSize());
		pageOrderResponse.setTotalElements(listeOfOrder.getTotalElements());
		pageOrderResponse.setTotalPages(listeOfOrder.getTotalPages());
		pageOrderResponse.setLast(listeOfOrder.isLast());
		return pageOrderResponse;	
	}

public List<OrderDTO> findOrderByUserEmail(String emailUser) {		
	List<Order> findOrderByUserEmail = orderRepository.findByUserEmailOrderByDateCreatedDesc(emailUser);
	List<OrderDTO> orderByEmail = findOrderByUserEmail.stream().map(this::mapEntityToDTO).collect(Collectors.toList());
	return orderByEmail;
}


public OrderDTO mapEntityToDTO(Order order) {
	
	OrderDTO orderDto = mapper.map(order, OrderDTO.class);

	return orderDto;			
}

public  Order mapDtoToEntity(OrderDTO orderDto) {

		Order newOrder  = mapper.map(orderDto, Order.class);	
    
	return newOrder;
	
}
	
}
