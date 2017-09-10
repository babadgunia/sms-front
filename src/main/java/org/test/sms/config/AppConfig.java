package org.test.sms.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.orm.hibernate5.HibernateExceptionTranslator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@ComponentScan("org.test.sms")
@EnableWebMvc
@EnableTransactionManagement
@EnableAsync
@PropertySource({"classpath:database.properties", "classpath:jwt.properties", "classpath:mail.properties"})
public class AppConfig extends WebMvcConfigurerAdapter {

    private Environment environment;

    @Autowired
    public AppConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public DataSource dataSource() {
//        BasicDataSource dataSource = new BasicDataSource();
//
//        dataSource.setDriverClassName(environment.getRequiredProperty("database.driver"));
//        dataSource.setUrl(environment.getRequiredProperty("database.url"));
//        dataSource.setUsername(environment.getRequiredProperty("database.username"));
//        dataSource.setPassword(environment.getRequiredProperty("database.password"));
        DataSource dataSource = null;
        try {
        InitialContext cxt = new InitialContext();
        if (cxt == null) {
            System.out.println("******************************");
        }

        dataSource = (DataSource) cxt.lookup("java:/comp/env/jdbc/postgres");

        if (dataSource == null) {
            System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        }
    } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("PIPECCCCCCCCCCCCCCCCCCCCCCCCCCC");
        }

        return dataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

        factory.setDataSource(dataSource());
        factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        factory.setPackagesToScan("org.test.sms.common.entity");

        return factory;
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        return new JpaTransactionManager(entityManagerFactory().getObject());
    }

    @Bean
    public HibernateExceptionTranslator hibernateExceptionTranslator() {
        return new HibernateExceptionTranslator();
    }

    @Bean
    public ViewResolver getViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();

        resolver.setPrefix("/ngdist/");
        resolver.setSuffix(".html");

        return resolver;
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(environment.getRequiredProperty("mail.server"));
        mailSender.setPort(environment.getRequiredProperty("mail.port", Integer.class));
        mailSender.setUsername(environment.getRequiredProperty("mail.username"));
        mailSender.setPassword(environment.getRequiredProperty("mail.password"));

        Properties properties = mailSender.getJavaMailProperties();

        properties.put("mail.transport.protocol", environment.getRequiredProperty("mail.transport.protocol"));
        properties.put("mail.smtp.auth", environment.getRequiredProperty("mail.smtp.auth"));
        properties.put("mail.smtp.starttls.enable", environment.getRequiredProperty("mail.smtp.starttls.enable"));

        return mailSender;
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}