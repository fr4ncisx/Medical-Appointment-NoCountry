package com.healthcare.domain.model.entity;

import com.healthcare.domain.dto.request.MedicRequest;
import com.healthcare.domain.model.enums.Gender;
import com.healthcare.domain.model.enums.Speciality;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Medic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "last_name")
    private String lastName;
    private String description;
    private String state;
    @Column(name = "dni")
    private String documentId;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Speciality speciality;
    private String phone;
    @OneToMany(mappedBy = "medic", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Appointment> appointment;
    @OneToOne(cascade = CascadeType.ALL) @JoinColumn(name = "user_id")
    private User user;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;
    @OneToMany(mappedBy = "medic", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Schedule> schedules;
    
    public Medic(MedicRequest medic, User user, Image image) {
        this.name = medic.getName();
        this.lastName = medic.getLastname();
        this.description = medic.getDescription();
        this.state = medic.getState();
        this.documentId = medic.getDocumentId();
        this.gender = medic.getGender();
        this.speciality = medic.getSpeciality();
        this.phone = medic.getPhone();
        this.image = image;
        this.user = user;
    }
}