package com.jediApps.sistema.examenes.servicios.impl;

import com.jediApps.sistema.examenes.entidades.Examen;
import com.jediApps.sistema.examenes.entidades.Pregunta;
import com.jediApps.sistema.examenes.repositorios.PreguntaRepository;
import com.jediApps.sistema.examenes.servicios.PreguntaService;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreguntaServiceImpl implements PreguntaService {

    @Autowired
    private PreguntaRepository preguntaRepository;

    @Override
    public Pregunta agregarPregunta(Pregunta pregunta) {
        return preguntaRepository.save(pregunta);
    }

    @Override
    public Pregunta actualizarPregunta(Pregunta pregunta) {
        return preguntaRepository.save(pregunta);
    }

    @Override
    public Set<Pregunta> obtenerPreguntas() {
        return (Set<Pregunta>) preguntaRepository.findAll();
    }

    @Override
    public Pregunta obtenerPregunta(Long id) {
        return preguntaRepository.findById(id).get();
    }

    @Override
    public Set<Pregunta> obtenerPreguntasIdExamen(Examen idExamen) {
        return preguntaRepository.findByExamen(idExamen);
    }

    @Override
    public void eliminarPregunta(Long id) {
        Pregunta pregunta = new Pregunta();
        pregunta.setId(id);
        preguntaRepository.delete(pregunta);
    }

    @Override
    public Pregunta listarPregunta(Long id) {
        return preguntaRepository.getOne(id);
    }

}
