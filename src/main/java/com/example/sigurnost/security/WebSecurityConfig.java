package com.example.sigurnost.security;

import com.example.sigurnost.service.JwtUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthorizationFilter authorizationFilter;
    private final JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private CustomOAuth2UserService oauthUserService;

    public WebSecurityConfig(AuthorizationFilter authorizationFilter, JwtUserDetailsService jwtUserDetailsService) {
        this.authorizationFilter = authorizationFilter;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }


    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http)  throws Exception{
        http = createAuthorizationRules(http);
            http.cors()
                    .and().csrf().disable()
                    //.authorizeRequests().antMatchers("/logink", "/loginWithGoogle", "/oauth2/**", "/logind", "login")
                    //.permitAll().anyRequest().authenticated()
                    //.and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                    .formLogin().permitAll()
                    .and()
                    .oauth2Login()
                    .loginPage("/login")
                    .userInfoEndpoint()
                    .userService(oauthUserService)
                    .and()
                    .successHandler(new AuthenticationSuccessHandler() {

                        @Override
                        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                            Authentication authentication) throws IOException, ServletException {

                            //CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();

                            //userService.processOAuthPostLogin(oauthUser.getEmail());
                            System.out.println("Auth success: " + authentication.getPrincipal());
                            DefaultOidcUser oauthUser = (DefaultOidcUser) authentication.getPrincipal();
                            String email = oauthUser.getAttribute("email");
                            System.out.println("Auth email: " + email);
                            //userDetailsService.processOAuthPostLogin(email);

                            response.sendRedirect("https://localhost:4200/log?id="+email);
                        }
                    });
            http.headers().xssProtection();

            //http = createAuthorizationRules(http);
            http.addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class);

    }

    private HttpSecurity createAuthorizationRules(HttpSecurity http) throws Exception {
        AuthorizationRules authorizationRules = new ObjectMapper().readValue(new ClassPathResource("rules.json").getInputStream(), AuthorizationRules.class);
        ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry interceptor = http.authorizeRequests();
        interceptor = interceptor.antMatchers(HttpMethod.POST, "/logink").permitAll().antMatchers(HttpMethod.POST, "/logind").permitAll()
                .antMatchers(HttpMethod.POST, "/oauth2/**").permitAll().antMatchers(HttpMethod.POST, "/login").permitAll().antMatchers("/loginWithGoogle").permitAll();
        for (Rule rule : authorizationRules.getRules()) {
            if (rule.getMethods().isEmpty())
                interceptor = interceptor.antMatchers(rule.getPattern()).hasAnyAuthority(rule.getRoles().toArray(String[]::new));
            else for (String method : rule.getMethods()) {
                interceptor = interceptor.antMatchers(HttpMethod.resolve(method), rule.getPattern()).hasAnyAuthority(rule.getRoles().toArray(String[]::new));
            }
        }
        return interceptor.anyRequest().denyAll().and();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("https://localhost:4200/");
        config.addAllowedOrigin("https://localhost:4401/");
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        //config.addAllowedMethod("PATCH");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    GrantedAuthorityDefaults grantedAuthorityDefaults() {
        return new GrantedAuthorityDefaults(""); // Remove the ROLE_ prefix
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
