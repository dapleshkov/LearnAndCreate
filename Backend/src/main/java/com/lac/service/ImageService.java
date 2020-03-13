package com.lac.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.lac.model.Image;
import com.lac.repository.FileRepository;
import org.apache.commons.codec.digest.DigestUtils;
//import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;

@Service
public class ImageService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private AmazonS3 awsS3Client;

    @Value("${jsa.s3.bucket}")
    private String bucketName;

    private final static String[] extensions = {".jpeg", ".jpg", ".img"};

    //todo::replace it with your own storage path
//    private final static String STORAGE_PATH = "C:\\Users\\Admin\\IdeaProjects\\17.learn-and-create\\Backend\\src\\main\\resources\\storage\\images";

    public Image store(MultipartFile multipartFile) throws IOException {
        String extension = multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf('.')).toLowerCase();
        if (!Arrays.asList(extensions).contains(extension))
            throw new IOException("Bad extension");

        String fileName = generateFileName(multipartFile.getOriginalFilename());
//        String extension = "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename());

//        Image image = new Image(fileName + extension, multipartFile.getContentType());

        String url = upload(fileName + extension, multipartFile);
        Image image = new Image(url, multipartFile.getContentType());
        return fileRepository.save(image);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }

    private static final String endpointUrl = "https://lacbucket.s3.eu-west-2.amazonaws.com";

    private String upload(String fileName, MultipartFile multipartFile) throws IOException {
        String fileUrl = "";
//        File file = convertMultiPartToFile(multipartFile);
        fileUrl += endpointUrl + "/" + "images/" + fileName;
//        awsS3Client.putObject(new PutObjectRequest(bucketName, fileName, file)
//                .withCannedAcl(CannedAccessControlList.PublicRead));
//        file.delete();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());
        metadata.setContentLength(multipartFile.getSize());
//        awsS3Client.putObject(bucketName, "images/" + fileName, multipartFile.getInputStream(), metadata);
        awsS3Client.putObject(new PutObjectRequest(bucketName, "images/" + fileName,
                multipartFile.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return fileUrl;
    }

    private String generateFileName(String originalName) {
        return DigestUtils.md5Hex(originalName + LocalDateTime.now());
    }

    public Image getFile(Long fileId) {
        return (Image) fileRepository.findByFileId(fileId);
    }
}
