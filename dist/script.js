document.addEventListener("DOMContentLoaded", () => {
    // Handle navigation bar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for sections and doctors
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

    // Remove loading screen on window load
    window.addEventListener("load", () => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.parentElement.removeChild(loading);
        }
    });

    // Initialize Google Map
    const initMap = () => {
        const mapOptions = {
            center: { lat: 40.712776, lng: -74.005974 }, // Replace with your coordinates
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        new google.maps.Marker({
            position: { lat: 40.712776, lng: -74.005974 }, // Replace with your coordinates
            map: map,
            title: 'Doc Clinic'
        });
    };

    window.initMap = initMap;

    // Handle contact form submission
    const form = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    if (form) {
        form.addEventListener('submit', (event) => {
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
    }

    // Handle appointment form submission
    const appointmentForm = document.getElementById('appointment-form');
    const appointmentResponse = document.getElementById('appointment-response');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (event) => {
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
    }
});
