package com.jediApps.sistema.examenes.servicios.impl;

import com.jediApps.sistema.examenes.entidades.Usuario;
import com.jediApps.sistema.examenes.entidades.UsuarioRol;
import com.jediApps.sistema.examenes.excepciones.UsuarioFoundException;
import com.jediApps.sistema.examenes.repositorios.RolRepository;
import com.jediApps.sistema.examenes.repositorios.UsuarioRepository;
import com.jediApps.sistema.examenes.servicios.UsuarioService;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServicesImpl implements UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private RolRepository rolRepository;
    
    @Override
    public Usuario guardarUsuario(Usuario usuario, Set<UsuarioRol> usuarioRoles) throws Exception {
        Usuario usuarioLocal = usuarioRepository.findByUsername(usuario.getUsername());
        if (usuarioLocal != null) {
            System.out.println("El usuario ya existe");
            throw new UsuarioFoundException("El usuario ya esta presente");
        } else {
            for (UsuarioRol usuarioRol : usuarioRoles) {
                rolRepository.save(usuarioRol.getIdRol());
            }
            usuario.getUsuarioRoles().addAll(usuarioRoles);
            usuarioLocal = usuarioRepository.save(usuario);
            
        }
        return usuarioLocal;
    }
    
    @Override
    public Usuario obtenerUsuario(String username) {
        return usuarioRepository.findByUsername(username);
    }
    
    @Override
    public void eliminarUuario(Long id) {
        usuarioRepository.deleteById(id); 
    }
    
}
