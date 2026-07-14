package com.example.eurekaserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Value;

/**
 * Secures the Eureka dashboard and registration endpoints with HTTP Basic auth.
 * Actuator health/info endpoints are left open so an AWS ALB / ECS health check
 * can reach them without credentials.
 *
 * Credentials are externalized via environment variables (see application.yml)
 * so they are never hard-coded in the image.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${security.username}")
    private String username;

    @Value("${security.password}")
    private String password;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(
                User.withUsername(username)
                        .password(encoder.encode(password))
                        .roles("ADMIN")
                        .build()
        );
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // required so Eureka clients can register/renew via POST/PUT/DELETE
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health/**", "/actuator/info").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic(org.springframework.security.config.Customizer.withDefaults());

        return http.build();
    }
}
