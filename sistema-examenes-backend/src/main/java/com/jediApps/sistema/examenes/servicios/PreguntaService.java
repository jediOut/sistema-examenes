package com.jediApps.sistema.examenes.servicios;

import com.jediApps.sistema.examenes.entidades.Examen;
import com.jediApps.sistema.examenes.entidades.Pregunta;
import java.util.Set;

public interface PreguntaService {

    Pregunta agregarPregunta(Pregunta pregunta);

    Pregunta actualizarPregunta(Pregunta pregunta);

    Set<Pregunta> obtenerPreguntas();

    Pregunta obtenerPregunta(Long id);

    Set<Pregunta> obtenerPreguntasIdExamen(Examen idExamen);

    void eliminarPregunta(Long id);

    Pregunta listarPregunta(Long id);
}
