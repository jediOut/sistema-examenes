package com.jediApps.sistema.examenes.repositorios;

import com.jediApps.sistema.examenes.entidades.Examen;
import com.jediApps.sistema.examenes.entidades.Pregunta;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreguntaRepository extends JpaRepository<Pregunta, Long>{

    public Set<Pregunta> findByExamen(Examen examen);

}
