package org.springframework.samples.petclinic.request;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/requests")

public class RequestRestController {
    private final RequestService requestService;

    @Autowired
    public RequestRestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
		return new ResponseEntity<>((List<Request>) this.requestService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "{id}")
	public ResponseEntity<Request> findById(@PathVariable("id") Integer id) {
		return new ResponseEntity<>(requestService.findRequestById(id), HttpStatus.OK);
	}

    @GetMapping(value = "{username}")
    public ResponseEntity<List<Request>> findRecievedRequest(@PathVariable("username") String username) {
        return new ResponseEntity<>((List<Request>) this.requestService.findRecievedRequest(username), HttpStatus.OK);
    }


}