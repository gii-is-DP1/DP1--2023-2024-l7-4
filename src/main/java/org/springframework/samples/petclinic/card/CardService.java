package org.springframework.samples.petclinic.card;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public Iterable<Card> findAll() {
        return cardRepository.findAll();
    }

    public Optional<Card> findById(int id) {
        return cardRepository.findById(id);
    }

    public Card save(Card card) {
        return cardRepository.save(card);
    }

    public void deleteById(int id) {
        cardRepository.deleteById(id);
    }

    public Card drawCard() {
    List<Card> allCards = (List<Card>) cardRepository.findAll();
    Random rand = new Random();
    return allCards.get(rand.nextInt(allCards.size()));
  }
}
