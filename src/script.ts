document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('nav') as HTMLElement;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('.section');
    const doctors = document.querySelectorAll('.doctor');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    doctors.forEach(doctor => {
        observer.observe(doctor);
    });

    window.addEventListener("load", () => {
        const loading = document.getElementById('loading');
        loading?.parentElement?.removeChild(loading);
    });

    const initMap = () => {
        const mapOptions = {
            center: { lat: 40.712776, lng: -74.005974 }, // Replace with your coordinates
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
        new google.maps.Marker({
            position: { lat: 40.712776, lng: -74.005974 }, // Replace with your coordinates
            map: map,
            title: 'Doc Clinic'
        });
    };

    (window as any).initMap = initMap;

    const form = document.getElementById('contact-form') as HTMLFormElement;
    const formResponse = document.getElementById('form-response') as HTMLElement;

    form?.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        fetch('https://example.com/submit-form', { // Replace with your form submission endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            formResponse.textContent = 'Message sent successfully!';
            form.reset();
        })
        .catch(error => {
            formResponse.textContent = 'Error sending message. Please try again later.';
        });
    });

    const appointmentForm = document.getElementById('appointment-form') as HTMLFormElement;
    const appointmentResponse = document.getElementById('appointment-response') as HTMLElement;

    appointmentForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(appointmentForm);
        const data = {
            name: formData.get('patient-name'),
            date: formData.get('appointment-date'),
            time: formData.get('appointment-time'),
            doctor: formData.get('doctor')
        };

        fetch('https://example.com/book-appointment', { // Replace with your appointment booking endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            appointmentResponse.textContent = 'Appointment booked successfully!';
            appointmentForm.reset();
        })
        .catch(error => {
            appointmentResponse.textContent = 'Error booking appointment. Please try again later.';
        });
    });
});
