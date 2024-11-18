package com.jediApps.sistema.examenes.servicios.impl;

import com.jediApps.sistema.examenes.entidades.Categoria;
import com.jediApps.sistema.examenes.repositorios.CategoriaRepository;
import com.jediApps.sistema.examenes.servicios.CategoriaService;
import java.util.LinkedHashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Override
    public Categoria agregarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    @Override
    public Categoria actualizarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    @Override
    public Set<Categoria> obtenerCategorias() {
        return new LinkedHashSet<>(categoriaRepository.findAll());
    }
    
    @Override
    public Categoria obtenerCategoria(Long id) {
        return categoriaRepository.findById(id).get();
    }
    
    @Override
    public void eliminarCategoria(Long id) {
        Categoria categoria = new Categoria();
        categoria.setId(id);
        categoriaRepository.delete(categoria);
     }
    
}
