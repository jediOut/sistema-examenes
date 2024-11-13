package com.jediApps.sistema.examenes.servicios;

import com.jediApps.sistema.examenes.entidades.Usuario;
import com.jediApps.sistema.examenes.entidades.UsuarioRol;
import java.util.Set;

public interface UsuarioService {

    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception;

    public Usuario obtenerUsuario(String username);

    public void eliminarUuario(Long id);
}
