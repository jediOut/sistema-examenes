/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.jediApps.sistema.examenes.controladores;

import com.jediApps.sistema.examenes.entidades.Rol;
import com.jediApps.sistema.examenes.entidades.Usuario;
import com.jediApps.sistema.examenes.entidades.UsuarioRol;
import com.jediApps.sistema.examenes.servicios.UsuarioService;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @PostMapping("/")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) throws Exception {
        usuario.setPerfil("default.png"); 
        usuario.setPassword(this.bCryptPasswordEncoder.encode(usuario.getPassword())); 
        Set<UsuarioRol> UsuarioRoles = new HashSet<>();
        Rol rol = new Rol();
        rol.setId(2L);
        rol.setNombre("NORMAL");
        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setIdUsuario(usuario);
        usuarioRol.setIdRol(rol);
        
        UsuarioRoles.add(usuarioRol);
        return usuarioService.guardarUsuario(usuario, UsuarioRoles);
    }
    
    @GetMapping("/{username}")
    public Usuario obtenerUsuario(@PathVariable("username") String username) {
        return usuarioService.obtenerUsuario(username);
    }

    @DeleteMapping("{id}")
    public void eliminarUsuario(@PathVariable("id") Long id) {
        usuarioService.eliminarUuario(id); 
    }
    
}
