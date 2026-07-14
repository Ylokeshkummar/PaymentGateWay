package com.example.eurekaserver;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "eureka.client.register-with-eureka=false",
        "eureka.client.fetch-registry=false",
        "eureka.security.username=test",
        "eureka.security.password=test"
})
class EurekaServerApplicationTests {

    @Test
    void contextLoads() {
        // Verifies the Spring context (including EnableEurekaServer + Security config) starts cleanly.
    }
}
