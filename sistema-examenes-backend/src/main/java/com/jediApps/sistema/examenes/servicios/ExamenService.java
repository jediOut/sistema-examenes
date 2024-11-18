package com.jediApps.sistema.examenes.servicios;

import com.jediApps.sistema.examenes.entidades.Categoria;
import com.jediApps.sistema.examenes.entidades.Examen;
import java.util.List;
import java.util.Set;

public interface ExamenService {

    Examen agregarExamen(Examen examen);

    Examen actualizarExamen(Examen examen);

    Set<Examen> obtenerExamenes();

    Examen obtenerExamen(Long id);

    void eliminarExamen(Long id);

    List<Examen> listarExamenesDeUnaCategoria(Categoria categoria);

    List<Examen> obtenerExamenesActivos();

    List<Examen> obtenerExamenesActivosDeUnaCategoria(Categoria categoria);
}
