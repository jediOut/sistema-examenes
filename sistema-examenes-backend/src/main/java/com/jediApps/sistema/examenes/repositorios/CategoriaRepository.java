
package com.jediApps.sistema.examenes.repositorios;

import com.jediApps.sistema.examenes.entidades.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    
}
