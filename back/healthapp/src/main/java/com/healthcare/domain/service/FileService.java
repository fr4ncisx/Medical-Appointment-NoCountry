package com.healthcare.domain.service;

import com.healthcare.domain.dto.response.FilesResponse;
import com.healthcare.domain.dto.response.InvalidFilesResponse;
import com.healthcare.domain.exceptions.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Slf4j
@Component
public class FileService {


    /**
     * This method verifies every MultipartFile with their extension and adds to a list
     * with invalid and valid files to show an error of invalid files
     *
     * @param file varArgs amount of MultiPartFile
     * @return a list of {@code FilesResponse}  that contains valid and invalid files
     * @throws FileUnableToUploadException if there are not compatible files
     */
    public List<FilesResponse> verifyFile(MultipartFile... file) {
        List<FilesResponse> filesList = new ArrayList<>();
        checkFileNotNull(file);
        for (MultipartFile multi : file) {
            checkIfFilesAreRepeated(file);
            var fileType = multi.getContentType();
            if (fileType != null) {
                if (validateExtensions(fileType)) {
                    filesList.add(new FilesResponse(convertToFile(multi), null));
                } else {
                    filesList.add(new FilesResponse(null, convertToFile(multi)));
                }
            }
        }
        var invalidFiles = filesList.stream()
                .filter(f -> f.getInvalidFile() != null)
                .map(f -> new InvalidFilesResponse(f.getInvalidFile().getName(), "Extensión no válida"))
                .toList();
        if (!invalidFiles.isEmpty()) {
            throw new FileUnableToUploadException(Map.of("Archivos Inválidos", invalidFiles));
        }
        return filesList;
    }

    public File verifyOneFile(MultipartFile multipartFile) {
        checkFileNotNull(multipartFile);
        var compatibleFile = validateExtensions(Objects.requireNonNull(multipartFile.getContentType()));
        if(compatibleFile) {
            return convertToFile(multipartFile);
        }
        throw new NotCompatibleFileEx("File is not compatible as an image");
    }

    /**
     * checks if the files are the same no prevent uploading issues
     *
     * @param files OneOrMany MultipartFiles
     */
    private void checkIfFilesAreRepeated(MultipartFile... files) {
        List<byte[]> fileList = new ArrayList<>();
        for (MultipartFile f : files) {
            try {
                fileList.add(f.getBytes());
            } catch (IOException e) {
                throw new UnreadableException("Error reading file bytes: " + e.getMessage());
            }
        }
        for (int i = 0; i < fileList.size() - 1; i++) {
            for (int j = i + 1; j < fileList.size(); j++) {
                if (Arrays.equals(fileList.get(i), fileList.get(j))) {
                    throw new IOFileException("Not able to upload repeated files");
                }
            }
        }
    }

    /**
     * Converts MultipartFile to File
     *
     * @param multi A MultipartFile
     * @return converted Multipart to File
     */
    private File convertToFile(MultipartFile multi) {
        File f = new File(Objects.requireNonNull(multi.getOriginalFilename()));
        try {
            FileCopyUtils.copy(multi.getBytes(), f);
        } catch (IOException e) {
            throw new IOFileException(e.getMessage());
        }
        return f;
    }

    /**
     * Checks if file is null or length zero
     *
     * @param file VarArgs of MultipartFiles, could be 1 or many
     */
    private void checkFileNotNull(MultipartFile... file) {
        if (file == null || file.length == 0)
            throw new FileNotFoundException("Unable to upload file, currently file is null");
    }

    /**
     * Checks if the extension is an image compatible
     *
     * @param fileType fileType from contentType of every MultiPartFile
     * @return {@code true} is a valid image
     * <br>
     * {@code false} if is not a compatible image
     */
    private boolean validateExtensions(String fileType) {
        switch (fileType.toLowerCase()) {
            case "image/jpeg", "image/jpg", "image/tiff", "image/bmp", "image/gif", "image/png", "image/webp" -> {
                return true;
            }
            default -> {
                return false;
            }
        }
    }
}
