package com.jediApps.sistema.examenes.controladores;

import com.jediApps.sistema.examenes.entidades.Examen;
import com.jediApps.sistema.examenes.entidades.Pregunta;
import com.jediApps.sistema.examenes.servicios.ExamenService;
import com.jediApps.sistema.examenes.servicios.PreguntaService;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pregunta")
@CrossOrigin("*")
public class PreguntaController {

    @Autowired
    private PreguntaService preguntaService;
    @Autowired
    private ExamenService examenService;

    @PostMapping("/")
    public ResponseEntity<Pregunta> guardar(@RequestBody Pregunta pregunta) {
        return ResponseEntity.ok(preguntaService.agregarPregunta(pregunta));
    }

    @PutMapping("/")
    public ResponseEntity<Pregunta> actualizar(@RequestBody Pregunta pregunta) {
        return ResponseEntity.ok(preguntaService.actualizarPregunta(pregunta));
    }

    @GetMapping("/examen/{id}")
    public ResponseEntity<?> listarPreguntasDelExamen(@PathVariable("id") long idExamen) {
        Examen examen = examenService.obtenerExamen(idExamen);
        Set<Pregunta> preguntas = examen.getPreguntas();
        List examenes = new ArrayList(preguntas);
        if (examenes.size() > Integer.parseInt(examen.getNumeroDePreguntas())) {
            examenes = examenes.subList(0, Integer.parseInt(examen.getNumeroDePreguntas() + 1));
        }
        Collections.shuffle(examenes);
        return ResponseEntity.ok(examenes);

    }

    @GetMapping("/{id}")
    public Pregunta listarPreguntaPorId(@PathVariable("id") Long id) {
        return preguntaService.obtenerPregunta(id);
    }

    @DeleteMapping("{id}")
    public void eliminar(@PathVariable("id") Long id) {
        preguntaService.eliminarPregunta(id);
    }

    @GetMapping("examen/todos/{id}")
    public ResponseEntity<?> listarPreguntasAdministrador(@PathVariable("id") long idExamen) {
        Examen examen = new Examen();
        examen.setId(idExamen);
        Set<Pregunta> preguntas = preguntaService.obtenerPreguntasIdExamen(examen);
        return ResponseEntity.ok(preguntas);
    }

    @PostMapping("evaluar-examen")
    public ResponseEntity<?> evaluarExamen(@RequestBody List<Pregunta> preguntas) {
        double puntosMaximos = 0;
        Integer respuestasCorrectas = 0;
        Integer intentos = 0;

        if (preguntas.isEmpty()) {
            return ResponseEntity.badRequest().body("No hay preguntas para evaluar");
        }

        double puntosMaximosPorPregunta = Double.parseDouble(preguntas.get(0).getExamen().getPuntosMaximo()) / preguntas.size();

        for (Pregunta p : preguntas) {
            Pregunta pregunta = preguntaService.listarPregunta(p.getId());
            if (pregunta != null) {
                if (pregunta.getRespuesta().equals(p.getRespuestaDada())) {
                    respuestasCorrectas++;
                    puntosMaximos += puntosMaximosPorPregunta;
                }
                if (p.getRespuestaDada() != null) {
                    intentos++;
                }
            } 
        }

        Map<String, Object> respuestas = new HashMap<>();
        respuestas.put("puntosMaximos", puntosMaximos);
        respuestas.put("respuestasCorrectas", respuestasCorrectas);
        respuestas.put("intentos", intentos);

        return ResponseEntity.ok(respuestas);
    }

}
