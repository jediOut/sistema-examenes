package com.jediApps.sistema.examenes.servicios;

import com.jediApps.sistema.examenes.entidades.Categoria;
import java.util.Set;

public interface CategoriaService {

    Categoria agregarCategoria(Categoria categoria);

    Categoria actualizarCategoria(Categoria categoria);

    Set<Categoria> obtenerCategorias();

    Categoria obtenerCategoria(Long id);

    void eliminarCategoria(Long id);
}
