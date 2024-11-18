package com.jediApps.sistema.examenes.repositorios;

import com.jediApps.sistema.examenes.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    public Usuario findByUsername(String username);

    
}
