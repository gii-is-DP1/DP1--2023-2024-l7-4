package org.springframework.samples.petclinic.card;

public class CardUtils {

    // Precision and bullets between 0 and 6
    public static Integer limit(Integer value) {
        return Math.max(0, Math.min(value, 6));
    }

    // Limit health between 0 and 2
    public static Integer limitHealth(Integer health) {
        return Math.max(0, Math.min(health, 2));
    }

    // Function that imitates throwing a dice. The precision has to be greater or 
    // equals to shoot.
    public static Boolean disparo(Integer precision) {
        Double numeroAleatorio = Math.floor(Math.random() * 7);
        if (numeroAleatorio <= precision)
            return true;
        else
            return false;
    }
}
