package com.jediApps.sistema.examenes;

import com.jediApps.sistema.examenes.entidades.Rol;
import com.jediApps.sistema.examenes.entidades.Usuario;
import com.jediApps.sistema.examenes.entidades.UsuarioRol;
import com.jediApps.sistema.examenes.excepciones.UsuarioFoundException;
import com.jediApps.sistema.examenes.servicios.UsuarioService;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EntityScan("com.jediApps.sistema.examenes.entidades")
public class SistemaExamenesBackendApplication implements CommandLineRunner {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(SistemaExamenesBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        try {
//            Usuario usuario = new Usuario();
//            usuario.setNombre("Jedi");
//            usuario.setApellido("Viera");
//            usuario.setUsername("Jedi");
//            usuario.setPassword(bCryptPasswordEncoder.encode("12345"));
//            usuario.setEmail("jedi.viera@gmail.com");
//            usuario.setTelefono("2351146609");
//            usuario.setPerfil("foto.png");
//
//            Rol rol = new Rol();
//            rol.setId(1L);
//            rol.setNombre("ADMIN");
//            Set<UsuarioRol> usuarioRoles = new HashSet<>();
//            UsuarioRol usuarioRol = new UsuarioRol();
//            usuarioRol.setIdRol(rol);
//            usuarioRol.setIdUsuario(usuario);
//            usuarioRoles.add(usuarioRol);
//
//            Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario, usuarioRoles);
//            System.out.println(usuarioGuardado.getUsername());
//
//        } catch (UsuarioFoundException exception) {
//            exception.printStackTrace();
//        }

    }

}
