package com.asso.staff.service;

import java.util.List;

import com.asso.staff.dto.OrderDTO;
import com.asso.staff.utils.PageOrderResponse;

public interface IOrderService {

	PageOrderResponse getAllOrder(int pageNo,int pageSize,String sortBy);
	List<OrderDTO> findOrderByUserEmail(String emailUser);
}
