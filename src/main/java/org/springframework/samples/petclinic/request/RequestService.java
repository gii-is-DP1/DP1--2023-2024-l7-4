package org.springframework.samples.petclinic.request;


import java.util.List;
import org.springframework.dao.DataAccessException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.HashSet;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.transaction.annotation.Transactional;


@Service
public class RequestService{
    
private RequestRepository requestRepository;

@Autowired
    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }
    @Transactional(readOnly=true)
    public List<Request> findAll() {
        return (List<Request>) requestRepository.findAll();
    }

    @Transactional(readOnly = true)
	public Request findRequestById(int id) throws DataAccessException {
		return this.requestRepository.findById(id).orElseThrow(null);
	}
 
    @Transactional(readOnly=true)
    public List<Request> findRecievedRequest(Integer id) throws DataAccessException{
        return requestRepository.findReceivedRequest(id);
    }

    @Transactional
    public Request saveRequest(Request request) throws DataAccessException{
        return requestRepository.save(request);
    }

    @Transactional
    public Request acceptRequest(Request request) throws DataAccessException{
        request.setStatus(RequestState.ACCEPTED);
        return requestRepository.save(request);
    }

    @Transactional
    public void rejectRequest(Request request) throws DataAccessException{
         requestRepository.delete(request);
    }

    @Transactional
    public Set<Player> getFriends(Integer id) throws DataAccessException{
        List<Request> allRequests = findAll();
        Set<Player> friends = new HashSet<>();
        for(Request r : allRequests){
            if(r.getPlayerOne().getId().equals(id) && r.getStatus().equals(RequestState.ACCEPTED)){
                friends.add(r.getPlayerTwo());
            }
            else if(r.getPlayerTwo().getId().equals(id) && r.getStatus().equals(RequestState.ACCEPTED)){
                friends.add(r.getPlayerOne());
            }
        }
        return friends;
    }

}