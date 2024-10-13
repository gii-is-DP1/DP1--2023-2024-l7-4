package org.springframework.samples.petclinic.gameRequests;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GameRequestService {
    private GameRequestRepository gameRequestRepository;

    @Autowired
    public GameRequestService(GameRequestRepository gameRequestRepository) {
        this.gameRequestRepository = gameRequestRepository;
    }

    @Transactional(readOnly = true)
    public List<GameRequest> findAll() {
        return (List<GameRequest>) gameRequestRepository.findAll();

    }

    @Transactional(readOnly = true)
    public GameRequest findById(int id) {
        return gameRequestRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<GameRequest> findRecievedGameRequest(Integer id) throws DataAccessException {
        return gameRequestRepository.findReceivedGameRequest(id);
    }

    @Transactional
    public GameRequest saveRequest(GameRequest gameRequest) throws DataAccessException {
        List<GameRequest> requests = findAll();
        for (GameRequest request : requests) {
            if (request.getPlayerOne().getId() == gameRequest.getPlayerOne().getId()
                    && request.getPlayerTwo().getId() == gameRequest.getPlayerTwo().getId()
                    && request.getStatus() == GameRequestStatus.PENDING
                    && request.getMatchId() == gameRequest.getMatchId()) {
                throw new IllegalStateException("Request already exists");
            }
        }
        return gameRequestRepository.save(gameRequest);
    }

    @Transactional
    public GameRequest acceptRequest(GameRequest request, int id) throws DataAccessException {
        GameRequest toUpdate = findById(id);
        toUpdate.setStatus(GameRequestStatus.ACCEPTED);
        System.out.println(toUpdate);

        return saveRequest(toUpdate);
    }

    @Transactional
    public void rejectRequest(GameRequest request) throws DataAccessException {
        gameRequestRepository.delete(request);
    }

}
