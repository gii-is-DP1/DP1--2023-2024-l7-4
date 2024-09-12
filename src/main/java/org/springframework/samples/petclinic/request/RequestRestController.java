package org.springframework.samples.petclinic.request;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.auth.payload.response.MessageResponse;
import org.springframework.samples.petclinic.player.Player;
import org.springframework.samples.petclinic.player.PlayerService;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.validation.Valid;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/requests")

public class RequestRestController {
    private final RequestService requestService;
    private final PlayerService playerService;

    @Autowired
    public RequestRestController(RequestService requestService, PlayerService playerService) {
        this.requestService = requestService;
        this.playerService = playerService;
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return new ResponseEntity<>((List<Request>) this.requestService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Request> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(requestService.findRequestById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/received")
    public ResponseEntity<List<Request>> findReceivedRequest(@PathVariable("id") Integer id) {
        List<Request> pendingRequests = requestService.findRecievedRequest(id);
        return new ResponseEntity<>(pendingRequests, HttpStatus.OK);
    }

    // @PostMapping()
    // @ResponseStatus(HttpStatus.CREATED)
    // public ResponseEntity<Request> create(@RequestBody @Valid Request request)
    // throws URISyntaxException {
    // System.out.println("------------------------------------ Request: " +
    // request);

    // if (request.getPlayerOne() == null || request.getPlayerTwo() == null) {
    // return ResponseEntity.badRequest().body(null);
    // }

    // Player playerOne =
    // playerService.findByUsername(request.getPlayerOne().getUsername());
    // Player playerTwo =
    // playerService.findByUsername(request.getPlayerTwo().getUsername());

    // System.out.println("Player One: " + playerOne);
    // System.out.println("Player Two: " + playerTwo);

    // if (playerOne == null || playerTwo == null) {
    // return ResponseEntity.badRequest().body(null);
    // }

    // Request newRequest = new Request();
    // newRequest.setPlayerOne(playerOne);
    // newRequest.setPlayerTwo(playerTwo);
    // newRequest.setStatus(RequestState.PENDING);

    // Request savedRequest = requestService.saveRequest(newRequest);
    // return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    // }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Request> create(@RequestBody @Valid RequestDTO requestDTO) throws URISyntaxException {
        System.out.println("------------------------------------ RequestDTO: " +
                requestDTO);

        if (requestDTO.getPlayerOne() == null || requestDTO.getPlayerTwo() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Player playerOne = playerService.findByUsername(requestDTO.getPlayerOne());
        Player playerTwo = playerService.findByUsername(requestDTO.getPlayerTwo());

        System.out.println("Player One: " + playerOne);
        System.out.println("Player Two: " + playerTwo);

        if (playerOne == null || playerTwo == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Request newRequest = new Request();
        newRequest.setPlayerOne(playerOne);
        newRequest.setPlayerTwo(playerTwo);
        newRequest.setStatus(RequestState.PENDING);

        Request savedRequest = requestService.saveRequest(newRequest);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @PutMapping(value = "{requestId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Request> update(@PathVariable("requestId") Integer requestId,
            @RequestBody @Valid Request updatedRequest) throws URISyntaxException {

        RestPreconditions.checkNotNull(requestService.findRequestById(requestId), "Request", "ID", requestId);
        return new ResponseEntity<>(this.requestService.acceptRequest(updatedRequest, requestId), HttpStatus.OK);
    }

    @DeleteMapping(value = "{requestId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<MessageResponse> delete(@PathVariable("requestId") Integer requestId) {
        RestPreconditions.checkNotNull(requestService.findRequestById(requestId), "Request", "ID", requestId);
        requestService.rejectRequest(requestService.findRequestById(requestId));

        return new ResponseEntity<>(new MessageResponse("Request deleted!"), HttpStatus.OK);
    }

}