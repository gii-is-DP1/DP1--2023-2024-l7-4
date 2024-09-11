package org.springframework.samples.petclinic.request;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.auth.payload.response.MessageResponse;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

import java.net.URISyntaxException;
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

    @GetMapping(value = "/{id}/received")
    public ResponseEntity<List<Request>> findReceivedRequest(@PathVariable("id") Integer id) {
        List<Request> pendingRequests = requestService.findRecievedRequest(id);
        return new ResponseEntity<>(pendingRequests, HttpStatus.OK);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Request> create(@RequestBody @Valid Request request) throws URISyntaxException{
        Request newRequest = new Request();
		BeanUtils.copyProperties(request, newRequest, "id");
        newRequest.setStatus(RequestState.PENDING);
		Request savedRequest = this.requestService.saveRequest(newRequest);

		return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @PutMapping(value ="{requestId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Request> update(@PathVariable("requestId") Integer requestId, @RequestBody @Valid Request updatedRequest) throws URISyntaxException {

        Request existingRequest = requestService.findRequestById(requestId);
        if (existingRequest == null) {
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(requestService.acceptRequest(updatedRequest), HttpStatus.OK);
    }
    
    @DeleteMapping(value = "{requestId}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<MessageResponse> delete(@PathVariable("requestId") Integer requestId) {
		RestPreconditions.checkNotNull(requestService.findRequestById(requestId), "Request", "ID", requestId);
		requestService.rejectRequest(requestService.findRequestById(requestId));

		return new ResponseEntity<>(new MessageResponse("Request deleted!"), HttpStatus.OK);
	}


}