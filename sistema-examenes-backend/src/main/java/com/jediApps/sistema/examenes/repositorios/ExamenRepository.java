package com.jediApps.sistema.examenes.repositorios;

import com.jediApps.sistema.examenes.entidades.Categoria;
import com.jediApps.sistema.examenes.entidades.Examen;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamenRepository extends JpaRepository<Examen, Long> {

    List<Examen> findByCategoria(Categoria categoria);

    List<Examen> findByActivo(boolean estado);

    List<Examen> findByCategoriaAndActivo(Categoria categoria, boolean estado);
}
