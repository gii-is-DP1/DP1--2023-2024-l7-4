package org.springframework.samples.petclinic.card;

import java.util.Optional;

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
}
