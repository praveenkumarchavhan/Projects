package org.program.repository;

import org.program.entity.EmailData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailDataRepository extends JpaRepository<EmailData, Integer> {
	
	
}
