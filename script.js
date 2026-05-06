document.addEventListener('DOMContentLoaded', function () {

    // Mobile & Tablet Navbar Hamburger
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function () {
            navbar.classList.toggle('active');

            if (navbar.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbar.classList.remove('active');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    //DarkMode / LightMode
    const darkModeButton = document.getElementById('darkModeButton');
    const body = document.body;

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('dark-mode');
        darkModeButton.checked = false;
    } else {
        body.classList.remove('dark-mode');
        darkModeButton.checked = true;
    }

    darkModeButton.addEventListener('change', function () {
        if (darkModeButton.checked) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Contact
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submitBtn");
    const formNote = document.getElementById("formNote");

    if (contactForm && submitBtn && formNote) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const response = await fetch(
                    "https://formsubmit.co/ajax/wggachathungabimsara2007@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();

                if (data.success === "true") {
                    formNote.textContent = "✓ Message sent successfully!";
                    formNote.style.color = "lime";
                    contactForm.reset();
                } else {
                    throw new Error();
                }

            } catch (error) {
                formNote.textContent = "✗ Failed to send message!";
                formNote.style.color = "red";
            } finally {
                submitBtn.innerHTML = 'Submit';
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formNote.textContent = "";
                }, 5000);
            }
        });
    }
});