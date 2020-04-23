package com.lac.repository;

import com.lac.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
    Category findByCategoryId(Long categoryId);
}
