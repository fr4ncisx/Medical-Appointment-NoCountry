package com.healthcare.domain.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitConfig {

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange("topicExchange");
    }

    @Bean
    public Queue notificationQueue() {
        return new Queue("notification", true);
    }

    @Bean
    public Binding binding() {
        return new Binding("notification", Binding.DestinationType.QUEUE,
                "topicExchange", "notification.user.*", null);
    }

}
