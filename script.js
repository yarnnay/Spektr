function scrollToSection(event, sectionId) {
    event.preventDefault();
    closeMobileMenu();
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function openMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const header = document.querySelector('.header');

    mobileNav.classList.add('show-mobile-nav');
    document.body.style.overflow = 'hidden';
    if (header) header.classList.add('header-hidden');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const header = document.querySelector('.header');

    mobileNav.classList.remove('show-mobile-nav');
    document.body.style.overflow = '';
    if (header) header.classList.remove('header-hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', openMobileMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(closeMobileMenu, 100);
        });
    });

    const mobileButton = document.querySelector('.mobile-nav-button');
    if (mobileButton) {
        mobileButton.addEventListener('click', function () {
            setTimeout(closeMobileMenu, 100);
        });
    }

    if (mobileNav) {
        mobileNav.addEventListener('click', function (e) {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    function handleStickyHeader() {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', handleStickyHeader);
    handleStickyHeader(); 
});

function openModal(certificateId) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');

    const certificateImages = {
        1: 'images/cert1.jpg',
        2: 'images/cert2.jpg',
        3: 'images/cert3.jpg',
        4: 'images/cert4.jpg',
        5: 'images/cert5.jpg'
    };

    modalContent.style.backgroundImage = `url('${certificateImages[certificateId]}')`;

    modal.classList.add('active');

    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('close')) {
        return;
    }

    const modal = document.getElementById('modal');
    modal.classList.remove('active');

    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

function handleStickyHeader() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    handleStickyHeader();
    window.addEventListener('scroll', handleStickyHeader);
});

function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]'); 
    const navItems = document.querySelectorAll('.nav-item'); 
    const scrollPosition = window.scrollY + 50; 
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            const activeNavItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setActiveNavItem();
    window.addEventListener('scroll', setActiveNavItem);
});

function scrollToSection(event, sectionId) {
    event.preventDefault(); 

    const section = document.getElementById(sectionId);
    if (!section) return; 

    const headerOffset = 110;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}


document.getElementById('burger-menu').addEventListener('click', function () {
    document.getElementById('mobile-nav').classList.add('show-mobile-nav');
});

document.getElementById('close-menu').addEventListener('click', function () {
    document.getElementById('mobile-nav').classList.remove('show-mobile-nav');
});



function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

function animateNumbers() {
    const statsWrapper = document.querySelector('.stats__wrapper');

    if (isElementInViewport(statsWrapper) && !statsWrapper.classList.contains('animated')) {
        statsWrapper.classList.add('animated');

        const numberElements = statsWrapper.querySelectorAll('.h--2');

        numberElements.forEach(element => {
            const originalText = element.textContent;
            const prefix = originalText.charAt(0); 
            const targetValue = parseInt(originalText.substring(1)); 

            element.innerHTML = `${prefix}<span class="animated-number">0</span>`;
            const animatedElement = element.querySelector('.animated-number');

            let current = 0;
            const increment = Math.max(1, Math.ceil(targetValue / 50)); 
            const duration = 1500;
            const stepTime = duration / (targetValue / increment);

            const counter = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    animatedElement.textContent = targetValue;
                    clearInterval(counter);
                } else {
                    animatedElement.textContent = current;
                }
            }, stepTime);
        });

       
        window.removeEventListener('scroll', animateNumbers);
    }
}


document.head.insertAdjacentHTML('beforeend', `
<style>
    .h--2 {
        position: relative;
    }
    .animated-number {
        display: inline-block;
        transition: opacity 0.3s;
        font-size: 46px;
        line-height: 46px;
        font-weight: 500;
    }

    @media (max-width: 1024px) {
        .animated-number {
            
            font-size: 34px;
            line-height: 40px;
           
        }
    }

</style>
`);

window.addEventListener('scroll', animateNumbers);

document.addEventListener('DOMContentLoaded', animateNumbers);



document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');

    steps.forEach(step => {
        const header = step.querySelector('.step-header');
        const details = step.querySelector('.step-details');

        header.addEventListener('click', () => {
            const isActive = step.classList.contains('active');

            if (isActive) {
                step.classList.remove('active');
                details.style.maxHeight = details.scrollHeight + 'px';
                details.offsetHeight;
                details.style.maxHeight = '0px';
                details.style.paddingTop = '0px';
                details.style.paddingBottom = '0px';

                setTimeout(() => {
                    details.removeAttribute('style');
                }, 500);
            } else {
                step.classList.add('active');
                const extraSpace = 40;
                details.style.maxHeight = (details.scrollHeight + extraSpace) + 'px';
                details.style.paddingTop = '0px';
                details.style.paddingBottom = '24px';
            }
        });
    });
});

ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map("map", {
        center: [55.690857, 52.311828],
        zoom: 15,
        controls: [] 
    });

    const myPlacemark = new ymaps.Placemark(
        [55.690857, 52.311828],
        {
            hintContent: "Бульвар Павла Корчагина, 2а (ГЭС, 10/34а), этаж 2, офис №201",
            balloonContent: "Бульвар Павла Корчагина, 2а (ГЭС, 10/34а), этаж 2, офис №201"
        },
        {
            preset: "islands#redDotIcon"
        }
    );

    myMap.geoObjects.add(myPlacemark);
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.service__more .button');
    const allCards = document.querySelectorAll('.service__card');
    const hiddenCards = document.querySelectorAll('.service__card.hidden');
    const arrowIcon = toggleButton.querySelector('.arrow--icon svg');
    const serviceSection = document.querySelector('.service'); 
    let expanded = false;

    toggleButton.addEventListener('click', () => {
        expanded = !expanded;

        if (expanded) {
            hiddenCards.forEach(card => {
                card.style.display = 'flex';
            });
        } else {
            allCards.forEach((card, index) => {
                card.style.display = index < 3 ? 'flex' : 'none';
            });

            
            serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        arrowIcon.style.transform = expanded ? 'rotate(-90deg)' : 'rotate(90deg)';
        toggleButton.querySelector('.button-text').textContent = expanded ? 'Скрыть услуги' : 'Все услуги';
    });

    allCards.forEach((card, index) => {
        card.style.display = index < 3 ? 'flex' : 'none';
    });
});

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('fullName');
const nameError = document.getElementById('nameError');
const phoneInput = document.getElementById('phoneNumber');
const phoneError = document.getElementById('phoneError');
const telegramInput = document.getElementById('telegram');
const submitButton = document.querySelector('.form__submit .button');
const telegramError = document.getElementById('telegramError');

const TELEGRAM_BOT_TOKEN = '7636668058:AAHIwep0IBJ10a1DOfx0GTeuA34p0xGrBb4';
const TELEGRAM_CHAT_ID = '-1002752672231'; 

async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error('Ошибка отправки в Telegram');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        return { success: false, error: error.message };
    }
}

function validateName(name) {
    const nameRegex = /^[а-яёА-ЯЁa-zA-Z\s\-]+$/;
    return nameRegex.test(name) && name.trim().length > 0;
}

function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 11 && (cleanPhone.startsWith('7') || cleanPhone.startsWith('8'));
}

function formatPhone(value, keepCursor = false) {
    let cleaned = value.replace(/\D/g, '');

    if (cleaned.startsWith('8')) {
        cleaned = '7' + cleaned.slice(1);
    }

    if (cleaned.length > 0 && !cleaned.startsWith('7')) {
        cleaned = '7' + cleaned;
    }

    cleaned = cleaned.slice(0, 11);

    if (cleaned.length === 0) return '';
    if (cleaned.length === 1) return `+${cleaned} (`;
    if (cleaned.length <= 4) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
}

function getNewCursorPosition(oldValue, newValue, oldCursor) {
    const digitsBeforeCursor = oldValue.slice(0, oldCursor).replace(/\D/g, '').length;

    let digitCount = 0;
    for (let i = 0; i < newValue.length; i++) {
        if (/\d/.test(newValue[i])) {
            digitCount++;
            if (digitCount === digitsBeforeCursor + 1) {
                return i + 1;
            }
        }
    }

    return newValue.length;
}

function showNameError(show) {
    if (show) {
        nameInput.classList.add('error');
        nameError.style.display = 'block';
    } else {
        nameInput.classList.remove('error');
        nameError.style.display = 'none';
    }
}

function showPhoneError(show) {
    if (show) {
        phoneInput.classList.add('error');
        phoneError.style.display = 'block';
    } else {
        phoneInput.classList.remove('error');
        phoneError.style.display = 'none';
    }
}


function showTelegramError(show) {
    if (show) {
        telegramInput.classList.add('error');
        telegramError.style.display = 'block';
    } else {
        telegramInput.classList.remove('error');
        telegramError.style.display = 'none';
    }
}

function validateForm() {
    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();

    const isNameValid = nameValue !== '' && validateName(nameValue);
    const isPhoneValid = phoneValue !== '' && validatePhone(phoneValue);

    
    if (isNameValid && isPhoneValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

nameInput.addEventListener('input', function (e) {
    const cursorPosition = this.selectionStart;
    let value = this.value;

    value = value.replace(/[^а-яёА-ЯЁa-zA-Z\s\-]/g, '');

    value = capitalizeWords(value);

    if (this.value !== value) {
        this.value = value;
        
        this.setSelectionRange(cursorPosition, cursorPosition);
    }

    if (value.trim() === '') {
        showNameError(true);
    } else if (validateName(value)) {
        showNameError(false);
    }

    validateForm();
});

nameInput.addEventListener('keydown', function (e) {
    
    if (e.key.length === 1 && /[а-яёА-ЯЁa-zA-Z]/.test(e.key)) {
        const cursorPos = this.selectionStart;
        const beforeCursor = this.value.slice(0, cursorPos);

       
        if (cursorPos === 0 || /[\s\-]$/.test(beforeCursor)) {
            
            e.preventDefault();

            const afterCursor = this.value.slice(cursorPos);
            this.value = beforeCursor + e.key.toUpperCase() + afterCursor;
            this.setSelectionRange(cursorPos + 1, cursorPos + 1);

            this.dispatchEvent(new Event('input'));
        }
    }
});

nameInput.addEventListener('blur', function () {
    if (this.value.trim() === '' || !validateName(this.value)) {
        showNameError(true);
    }
    validateForm();
});

function formatPhone(value) {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length === 0) return '';

    let phoneNumbers = numbers;
    if (numbers[0] === '8') {
        phoneNumbers = '7' + numbers.slice(1);
    }

    if (phoneNumbers[0] === '7') {
        return phoneNumbers.replace(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
            (match, p1, p2, p3, p4, p5) => {
                let result = '+7';
                if (p2) result += ` (${p2}`;
                if (p2 && p2.length === 3) result += ')';
                if (p3) result += ` ${p3}`;
                if (p4) result += `-${p4}`;
                if (p5) result += `-${p5}`;
                return result;
            });
    }

    return '+7 ' + (numbers.length > 0 ? `(${numbers}` : '');
}

phoneInput.addEventListener('input', function (e) {
    const oldValue = this.value;
    const oldCursor = this.selectionStart;

    const newValue = formatPhone(this.value);
    this.value = newValue;

    const newCursor = getNewCursorPosition(oldValue, newValue, oldCursor);
    this.setSelectionRange(newCursor, newCursor);

    if (this.value.trim() === '') {
        showPhoneError(false);
    } else if (validatePhone(this.value)) {
        showPhoneError(false);
    } else {
        showPhoneError(true);
    }

    validateForm();
});

phoneInput.addEventListener('keydown', function (e) {
    const cursorPosition = this.selectionStart;
    const value = this.value;

    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 3) {
        e.preventDefault();
        return;
    }

    if (e.key === 'Backspace' && cursorPosition > 3) {
        const charBefore = value[cursorPosition - 1];
        if (charBefore && /[\s\-\(\)]/.test(charBefore)) {
            e.preventDefault();
           
            const newValue = value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
            this.value = formatPhone(newValue);

          
            const digitsBeforeCursor = value.slice(0, cursorPosition - 2).replace(/\D/g, '').length;
            let digitCount = 0;
            for (let i = 0; i < this.value.length; i++) {
                if (/\d/.test(this.value[i])) {
                    digitCount++;
                    if (digitCount === digitsBeforeCursor + 1) {
                        this.setSelectionRange(i, i);
                        break;
                    }
                }
            }
        }
    }

   
    if (e.key.length === 1 && !/[\d]/.test(e.key) &&
        !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
    }
});

phoneInput.addEventListener('focus', function () {
    if (this.value === '') {
        this.value = '+7 (';
        this.setSelectionRange(4, 4);
    }
});

phoneInput.addEventListener('blur', function () {
    if (this.value === '+7 (') {
        this.value = '';
    }

    if (this.value.trim() === '' || !validatePhone(this.value)) {
        showPhoneError(true);
    }

    validateForm();
});

phoneInput.addEventListener('paste', function (e) {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    const formatted = formatPhone(paste);
    this.value = formatted;

    this.setSelectionRange(formatted.length, formatted.length);

    this.dispatchEvent(new Event('input'));
    validateForm();
});

telegramInput.addEventListener('input', function () {
    let value = this.value;
    const cursorPosition = this.selectionStart;
    let hasInvalidChars = false;

    if (!value.startsWith('@')) {
        value = '@' + value.replace(/@/g, '');
    }

    if (value.length > 1) {
        value = '@' + value.slice(1).replace(/@/g, '');
    }

    const username = value.slice(1); 
    if (username.length > 0) {
       
        hasInvalidChars = /[^a-zA-Z0-9_]/.test(username);
    }

    
    const cleanUsername = username.replace(/[^a-zA-Z0-9_]/g, '');
    value = '@' + cleanUsername;

   
    this.value = value;

    
    if (hasInvalidChars) {
        showTelegramError(true);
    } else {
        showTelegramError(false);
    }

   
    const newCursorPos = Math.min(cursorPosition, value.length);
    this.setSelectionRange(newCursorPos, newCursorPos);
});

telegramInput.addEventListener('keydown', function (e) {
    const cursorPosition = this.selectionStart;

    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 1) {
        e.preventDefault();
        this.setSelectionRange(1, 1);
    }
});

telegramInput.addEventListener('focus', function () {
    if (this.value === '' || this.value === '@') {
        this.value = '@';
        this.setSelectionRange(1, 1);
    }
});

telegramInput.addEventListener('blur', function () {
    if (this.value === '@') {
        this.value = '';
        showTelegramError(false);
    }
});

window.addEventListener('load', function () {
    if (document.activeElement === telegramInput) {
        telegramInput.setSelectionRange(1, 1);
    }

    submitButton.disabled = true;
    validateForm();
});

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    let hasErrors = false;

    if (nameValue === '' || !validateName(nameValue)) {
        showNameError(true);
        if (!hasErrors) nameInput.focus();
        hasErrors = true;
    } else {
        showNameError(false);
    }

    if (phoneValue === '' || !validatePhone(phoneValue)) {
        showPhoneError(true);
        if (!hasErrors) phoneInput.focus();
        hasErrors = true;
    } else {
        showPhoneError(false);
    }

    if (hasErrors) {
        return false;
    }

    const telegramValue = telegramInput.value.trim();

    const message = `
📝 <b>Новая заявка с сайта</b>

👤 <b>Имя:</b> ${nameValue}
📞 <b>Телефон:</b> ${phoneValue}${telegramValue && telegramValue !== '@' ? `
💬 <b>Telegram:</b> ${telegramValue}` : ''}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
    `.trim();

    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляем...';

    try {
        const result = await sendToTelegram(message);

        if (result.success) {
            alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');

            form.reset();
            telegramInput.value = '';

            showNameError(false);
            showPhoneError(false);
            showTelegramError(false);

        } else {
            alert('Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.');
        }
    } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;

        validateForm();
    }

    return false;
});
