package com.comp90018.config;
import com.rabbitmq.client.AMQP;
import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_MSG = "exchange_msg";

    public static final String QUEUE_SYS_MSG = "queue_msg";

    @Bean(EXCHANGE_MSG)
    public Exchange exchange() {
        return ExchangeBuilder
                .topicExchange(EXCHANGE_MSG)
                .durable(true)
                .build();
    }

    @Bean(QUEUE_SYS_MSG)
    public Queue queue() {
        return new Queue(QUEUE_SYS_MSG);
    }

    @Bean
    public Binding binding(
            @Qualifier(QUEUE_SYS_MSG) Queue queue,
            @Qualifier(EXCHANGE_MSG) Exchange exchange) {
        return BindingBuilder
                .bind(queue)
                .to(exchange)
                .with("sys.msg.*")
                .noargs();
    }
}

