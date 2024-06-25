package org.springframework.samples.petclinic.gunfighter;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GunfighterController {
    

    @MessageMapping("/gunfighter")
    @SendTo("/topic/gunfighter")
    public Gunfighter infoGunfighter(Gunfighter gunfighter){
        return new Gunfighter(gunfighter.getHealth(), gunfighter.getPrecision(), gunfighter.getBullets(), gunfighter.isPreventDamage());
    }

}
