package com.jediApps.sistema.examenes.servicios.impl;

import com.jediApps.sistema.examenes.entidades.Categoria;
import com.jediApps.sistema.examenes.entidades.Examen;
import com.jediApps.sistema.examenes.repositorios.ExamenRepository;
import com.jediApps.sistema.examenes.servicios.ExamenService;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamenServiceImpl implements ExamenService {

    @Autowired
    private ExamenRepository examenRepository;

    @Override
    public Examen agregarExamen(Examen examen) {
        return examenRepository.save(examen);
    }

    @Override
    public Examen actualizarExamen(Examen examen) {
        return examenRepository.save(examen);
    }

    @Override
    public Set<Examen> obtenerExamenes() {
        return new LinkedHashSet<>(examenRepository.findAll());
    }

    @Override
    public Examen obtenerExamen(Long id) {
        return examenRepository.findById(id).get();
    }

    @Override
    public void eliminarExamen(Long id) {
        Examen examen = new Examen();
        examen.setId(id);
        examenRepository.delete(examen);
    }

    @Override
    public List<Examen> listarExamenesDeUnaCategoria(Categoria categoria) {
        return examenRepository.findByCategoria(categoria);
    }

    @Override
    public List<Examen> obtenerExamenesActivos() {
        return examenRepository.findByActivo(true);
    }

    @Override
    public List<Examen> obtenerExamenesActivosDeUnaCategoria(Categoria categoria) {
    return examenRepository.findByCategoriaAndActivo(categoria, true);
    }

}
