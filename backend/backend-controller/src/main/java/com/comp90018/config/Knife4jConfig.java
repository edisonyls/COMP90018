package com.comp90018.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

@Configuration
@EnableSwagger2WebMvc
public class Knife4jConfig {
    @Bean
    public Docket defaultApi2() {
        Docket docket=new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(new ApiInfoBuilder()
                        .description("Comp90018 Api Documentation")
                        .termsOfServiceUrl("http://www.xxx.com/")
                        .contact(new Contact("nxj", "http://www.xxx.com/", "abc@xxx.com"))
                        .version("1.0")
                        .build())
                .groupName("springboot 2.X edition")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.comp90018.controller"))
                .paths(PathSelectors.any())
                .build();
        return docket;
    }
}
