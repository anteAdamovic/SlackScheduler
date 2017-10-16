package infobip.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import infobip.request.CreateJobRequest;
import infobip.request.DeleteJobRequest;
import infobip.response.CreateJobResponse;
import infobip.response.DeleteJobResponse;
import infobip.response.JobsResponse;
import infobip.service.JobService;

@RestController
public class JobController {
	
	@Autowired
    private RestTemplateBuilder restTemplateBuilder;
	
	@Autowired
	private JobService jobService;
    
	@CrossOrigin(origins = "null")
    @RequestMapping(value = "/job", method = RequestMethod.POST)
    public CreateJobResponse createJob(@RequestParam() CreateJobRequest request) {
    	return new CreateJobResponse(200, false, true, "No service found.");
    }
    
//	@CrossOrigin(origins = "null")
//    @RequestMapping(value = "/job", method = RequestMethod.DELETE)
//    public DeleteJobResponse deleteJob(@RequestParam() DeleteJobRequest request) {
//    	return new DeleteJobResponse(200, false);
//    }
   
	@CrossOrigin(origins = "null")
    @RequestMapping("/jobs")
    public JobsResponse getJobs() {
    	return jobService.getJobs();
    }

//    @RequestMapping(value = "/job", method = RequestMethod.POST)
//    public String createMessage(@RequestParam() String name) throws RestClientException, URISyntaxException {
//        RestTemplate restTemplate = this.restTemplateBuilder.build();
//        HttpEntity<String> request = new HttpEntity<>(new String("{\"text\": \"Black Wich.\\nGigner Beard.\"}"));
//        ResponseEntity<String> response = null;
//        try {
//        	response = restTemplate.postForEntity("https://hooks.slack.com/services/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", request, String.class);
//        	System.out.println(response);
//        } catch (Exception e) {
//        	System.out.print(e.getMessage());
//        }
//        return (response != null ? response.getStatusCode().toString() : "null");
//    }
//    
//    @RequestMapping(value = "/job", method = RequestMethod.DELETE)
//    public String deleteMessage(@RequestParam() String name) throws RestClientException, URISyntaxException {
//        RestTemplate restTemplate = this.restTemplateBuilder.build();
//        HttpEntity<String> request = new HttpEntity<>(new String("{\"text\": \"Black Wich.\\nGigner Beard.\"}"));
//        ResponseEntity<String> response = null;
//        try {
//        	response = restTemplate.postForEntity("https://hooks.slack.com/services/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", request, String.class);
//        	System.out.println(response);
//        } catch (Exception e) {
//        	System.out.print(e.getMessage());
//        }
//        return (response != null ? response.getStatusCode().toString() : "null");
//    }
}
