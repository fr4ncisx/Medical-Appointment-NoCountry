package com.healthcare.domain.service;

import com.healthcare.domain.dto.request.RabbitRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class NotificationListener {

    private final SimpMessagingTemplate messagingTemplate;

    /**
     * This receives every rabbitmq message
     * and send it to a private websocket channel
     * we request by the securitycontext the userId and then do the validations
     *the user that want to receive the message
     * @param message Message from the service
     */
    @RabbitListener(queues = "notification")
    public void receiveMessage(Message message) {
        String payload = new String(message.getBody());
        String routingKey = message.getMessageProperties().getReceivedRoutingKey();
        String userId = routingKey.split("\\.")[2];
        messagingTemplate.convertAndSendToUser(userId, "/notifications", payload);
        log.info("Message send from RabbitMQ {}", userId +"/notifications");
    }

    public void sendMessageToSuscribe(RabbitRequest rabbitRequest) {
        String payload = rabbitRequest.getPayload();
        String userId = String.valueOf(rabbitRequest.getId());
        messagingTemplate.convertAndSendToUser(userId, "/notifications", payload);
        log.info("Message send from Websocket internal {}", payload);
    }

}
