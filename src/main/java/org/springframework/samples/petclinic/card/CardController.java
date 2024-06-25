package org.springframework.samples.petclinic.card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/v1/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping
    public Iterable<Card> getAllCards() {
        return cardService.findAll();
    }

    @GetMapping("/{id}")
    public Card getCardById(@PathVariable int id) {
        return cardService.findById(id).orElse(null);
    }

    @PostMapping
    public Card createCard(@RequestBody Card card) {
        return cardService.save(card);
    }

    @PutMapping("/{id}")
    public Card updateCard(@PathVariable int id, @RequestBody Card cardDetails) {
        Card card = cardService.findById(id).orElse(null);
        if (card != null) {
            card.setName(cardDetails.getName());
            card.setAction(cardDetails.getAction());
            card.setPower(cardDetails.getPower());
            card.setCategory(cardDetails.getCategory());
            card.setBullet(cardDetails.getBullet());
            card.setAccuracy(cardDetails.getAccuracy());
            card.setDiscart(cardDetails.getDiscart());
            return cardService.save(card);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable int id) {
        cardService.deleteById(id);
    }

    @GetMapping("/draw")
  public ResponseEntity<Card> drawCard() {
    Card card = cardService.drawCard();
    return ResponseEntity.ok(card);
  }
}

