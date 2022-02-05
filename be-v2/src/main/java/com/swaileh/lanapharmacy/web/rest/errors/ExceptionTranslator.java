package com.swaileh.lanapharmacy.web.rest.errors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.NativeWebRequest;
import org.zalando.problem.DefaultProblem;
import org.zalando.problem.Problem;
import org.zalando.problem.ProblemBuilder;
import org.zalando.problem.spring.web.advice.ProblemHandling;
import org.zalando.problem.spring.web.advice.security.SecurityAdviceTrait;
import org.zalando.problem.violations.ConstraintViolationProblem;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.zalando.problem.Status.NOT_FOUND;

@ControllerAdvice
public class ExceptionTranslator implements ProblemHandling, SecurityAdviceTrait {

    private static final String FIELD_ERRORS_KEY = "fieldErrors";
    private static final String ENTITY_ERRORS_KEY = "entityErrors";
    private static final String MESSAGE_KEY = "message";
    private static final String PATH_KEY = "path";
    private static final String VIOLATIONS_KEY = "violations";

    private MessageSource messageSource;

    @Autowired
    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * Post-process the Problem payload to add the message key for the front-end if needed.
     */
    @Override
    public ResponseEntity<Problem> process(@Nullable ResponseEntity<Problem> entity, NativeWebRequest request) {
        if (entity == null) {
            return null;
        }
        Problem problem = entity.getBody();
        if (!(problem instanceof ConstraintViolationProblem || problem instanceof DefaultProblem)) {
            return entity;
        }

        HttpServletRequest nativeRequest = request.getNativeRequest(HttpServletRequest.class);
        String requestUri = nativeRequest != null ? nativeRequest.getRequestURI() : StringUtils.EMPTY;
        ProblemBuilder builder = Problem
            .builder()
            .withType(Problem.DEFAULT_TYPE.equals(problem.getType()) ? ErrorConstants.DEFAULT_TYPE : problem.getType())
            .withStatus(problem.getStatus())
            .withTitle(problem.getTitle())
            .with(PATH_KEY, requestUri);

        if (problem instanceof ConstraintViolationProblem) {
            builder
                .with(VIOLATIONS_KEY, ((ConstraintViolationProblem) problem).getViolations())
                .with(MESSAGE_KEY, ErrorConstants.ERR_VALIDATION);
        } else {
            builder.withCause(((DefaultProblem) problem).getCause()).withDetail(problem.getDetail()).withInstance(problem.getInstance());
            problem.getParameters().forEach(builder::with);
            if (!problem.getParameters().containsKey(MESSAGE_KEY) && problem.getStatus() != null) {
                builder.with(MESSAGE_KEY, "error.http." + problem.getStatus().getStatusCode());
            }
        }
        return new ResponseEntity<>(builder.build(), entity.getHeaders(), entity.getStatusCode());
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<Problem> handleResourceNotFoundException(ResourceNotFoundException ex, NativeWebRequest request) {
        List<EntityErrorVM> errors = new ArrayList<>();
        errors.add(new EntityErrorVM(ex.getEntityName(), ex.getErrorKey(), ex.getMessage()));
        List<FieldErrorVM> fieldErrors = ex.getFieldErrors().entrySet().stream()
            .map(e -> new FieldErrorVM(ex.getEntityName(), e.getKey(), ex.getErrorKey(), e.getValue()))
            .collect(Collectors.toList());

        Problem problem = Problem.builder().withType(ErrorConstants.ENTITY_NOT_FOUND_TYPE)
            .withTitle("Method argument not valid").withStatus(NOT_FOUND)
            .with(MESSAGE_KEY, ErrorConstants.ERR_VALIDATION).with(ENTITY_ERRORS_KEY, errors)
            .with(FIELD_ERRORS_KEY, fieldErrors).build();
        return create(ex, problem, request);
    }

    @ExceptionHandler({BadRequestAlertException.class})
    public ResponseEntity<Problem> handleBadRequestAlertException(BadRequestAlertException ex,
                                                                  NativeWebRequest request) {
        List<EntityErrorVM> errors = new ArrayList<>();
        errors.add(new EntityErrorVM(ex.getEntityName(), ex.getErrorKey(), ex.getMessage()));
        List<FieldErrorVM> fieldErrors = ex.getFieldErrors().entrySet().stream()
            .map(e -> new FieldErrorVM(ex.getEntityName(), e.getKey(), ex.getErrorKey(), e.getValue()))
            .collect(Collectors.toList());

        Problem problem = Problem.builder().withType(ErrorConstants.CONSTRAINT_VIOLATION_TYPE)
            .withTitle("Method argument not valid").withStatus(defaultConstraintViolationStatus())
            .with(MESSAGE_KEY, ErrorConstants.ERR_VALIDATION).with(ENTITY_ERRORS_KEY, errors)
            .with(FIELD_ERRORS_KEY, fieldErrors).build();
        return create(ex, problem, request);
    }

}
