package com.healthcare.domain.websocket;

import com.healthcare.domain.model.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.Map;

@Slf4j
@Component
public class WebSocketInterceptor implements ChannelInterceptor {


    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (accessor.getCommand() == StompCommand.SUBSCRIBE) {
            log.info("Comando SUBSCRIBE recibido");
            Map<String, Object> attributes = accessor.getSessionAttributes();
            if (attributes != null) {
                Object user = attributes.get("user");
                Assert.notNull(user, "El usuario nunca debe ser nulo");

                if (user instanceof User u) {
                    log.info("El id de usuario es {}", u.getId());

                    // Aquí puedes agregar lógica para validar que el usuario tenga acceso al canal
                    String destination = accessor.getDestination();
                    if (destination != null && destination.startsWith("/user/")) {
                        String userId = u.getId().toString();
                        if (!destination.equals("/user/" + userId + "/notifications")) {
                            throw new SecurityException("Acceso denegado: no puedes suscribirte a este canal.");
                        }
                    }
                }
            }
        }
        return message;
    }
}
