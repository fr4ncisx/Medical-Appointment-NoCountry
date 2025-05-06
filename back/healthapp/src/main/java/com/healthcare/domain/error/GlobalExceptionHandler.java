package com.healthcare.domain.error;

import com.healthcare.domain.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String STATUS_ERROR = "ERROR";

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleException(HttpMessageNotReadableException ex) {
        Map<String, String> errors = new HashMap<>();

        Map<String, String> errorPatterns = Map.of(
                "Required request body is missing", "El cuerpo de la consulta está vacío",
                "was expecting comma to separate", "Falta coma para separar algunos de los atributos",
                "expected close marker for Object", "Se espera cierre de llave al final",
                "not one of the values accepted for Enum class:",
                "Error de deserialización: el valor " + ex.getLocalizedMessage().split("\"")[1] +
                        " no es uno de los valores aceptados. Valores esperados: " +
                        ex.getLocalizedMessage().substring(ex.getLocalizedMessage().indexOf("[")),
                "Cannot construct instance of", "Error de formato en la solicitud"
        );

        String errorMsg = errorPatterns.entrySet().stream()
                .filter(entry -> ex.getMessage().contains(entry.getKey()))
                .map(Map.Entry::getValue)
                .findFirst()
                .orElse("Error en la solicitud. Verifique el formato del JSON.");

        errors.put(STATUS_ERROR, errorMsg);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CloudinaryException.class)
    public ResponseEntity<Map<String, String>> cloudinaryGenericEx(CloudinaryException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotCompatibleFileEx.class)
    public ResponseEntity<Map<String, String>> fileNotAllowed(NotCompatibleFileEx ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnreadableException.class)
    public ResponseEntity<Map<String, String>> unreadableEx(UnreadableException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> maxUploadFileSizeExceeded(MaxUploadSizeExceededException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IOFileException.class)
    public ResponseEntity<Map<String, String>> fileProblem(IOFileException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<Map<String, String>> missingFileforUpload(MissingServletRequestPartException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<Map<String, Object>> fileNotFound(FileNotFoundException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileUnableToUploadException.class)
    public ResponseEntity<Map<String, Object>> invalidFileInput(FileUnableToUploadException ex) {
        if (ex.getFiles() != null && !ex.getFiles().isEmpty()) {
            return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getFiles()), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, String>> credentialsVerifyError(InvalidCredentialsException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Map<String, String>> missingServlet(MissingServletRequestParameterException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<Map<String, String>> deniedAccess(AuthorizationDeniedException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> illegalArgument(IllegalArgumentException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Map<String, String>> mediaTypeNotSupportedEx(HttpMediaTypeNotSupportedException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundInDatabaseException.class)
    public ResponseEntity<Map<String, String>> notFoundInDataBase(NotFoundInDatabaseException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MedicNotFoundException.class)
    public ResponseEntity<Map<String, String>> medicNotFound(MedicNotFoundException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PatientNotFoundException.class)
    public ResponseEntity<Map<String, String>> patientNotFound(PatientNotFoundException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MedicScheduleConflictException.class)
    public ResponseEntity<Map<String, String>> medicScheduleConflict(MedicScheduleConflictException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AppointmentNotFoundException.class)
    public ResponseEntity<Map<String, String>> appointmentNotFound(AppointmentNotFoundException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AppointmentDateConflictException.class)
    public ResponseEntity<Map<String, String>> appointmentDateConflict(AppointmentDateConflictException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CancelledAppointmentException.class)
    public ResponseEntity<Map<String, String>> cancelledAppointment(CancelledAppointmentException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<Map<String, String>> invalidDataException(InvalidDataException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicatedEntryEx.class)
    public ResponseEntity<Map<String, String>> duplicateException(DuplicatedEntryEx ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidFieldException.class)
    public ResponseEntity<Map<String, String>> invalidFieldException(InvalidFieldException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MedicDeletionException.class)
    public ResponseEntity<Map<String, String>> medicDeleteException(MedicDeletionException ex) {
        return new ResponseEntity<>(Map.of(STATUS_ERROR, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ShowFieldErrors>> validationErrors(MethodArgumentNotValidException ex) {
        List<ShowFieldErrors> listOfErrors = ex.getFieldErrors().stream()
                .map(e -> new ShowFieldErrors(e.getField(), e.getDefaultMessage()))
                .toList();
        return new ResponseEntity<>(listOfErrors, HttpStatus.BAD_REQUEST);
    }

    private record ShowFieldErrors(String campo, String error) {
    }
}


